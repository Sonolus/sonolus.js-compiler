/* eslint-disable @typescript-eslint/no-empty-function */

import { EngineArchetypeDataName, EnginePlayDataArchetype } from '@sonolus/core'
import { Intrinsic } from '../../intrinsic/index.js'
import { createDefineBlock, readContainer } from '../shared/blocks/utils.js'
import { ContainerType } from '../shared/containers/ContainerType.js'
import { DataType } from '../shared/containers/DataType.js'
import { defineLib } from '../shared/define/lib.js'
import { Judgment } from '../shared/enums/Judgment.js'
import { ArchetypeLife } from '../shared/life.js'
import { compiler } from './compiler.js'
import { EntityState } from './enums/EntityState.js'
import { native } from './index.js'
import { life } from './life.js'
import {
    allWritablePointer,
    preprocessWritablePointer,
    readonlyPointer,
    singleThreadedWritablePointer,
} from './utils/pointer.js'

type EntityImportDefinition = Record<
    string,
    {
        name: EngineArchetypeDataName | (string & {})
        type: NumberConstructor | BooleanConstructor | typeof DataType<number | boolean>
    }
>

type EntityImportType<T extends EntityImportDefinition> = {
    [K in keyof T]: T[K]['type'] extends NumberConstructor
        ? number
        : T[K]['type'] extends BooleanConstructor
          ? boolean
          : InstanceType<T[K]['type']> extends DataType<infer T>
            ? T
            : never
}

type EntityImport<T extends EntityImportDefinition> = EntityImportType<T> & {
    names: {
        [K in keyof T]: T[K]['name']
    }
} & EntityImportLib<T>

type EntityImportLib<T extends EntityImportDefinition> = {
    get(index: number): EntityImportType<T>
}

type EntityExportDefinition = Record<
    string,
    {
        name: EngineArchetypeDataName | (string & {})
        type: NumberConstructor | BooleanConstructor | typeof DataType<number | boolean>
    }
>

type EntityExportArgs<T extends EntityExportDefinition> = {
    [K in keyof T]: [
        key: K,
        value: T[K]['type'] extends NumberConstructor
            ? number
            : T[K]['type'] extends BooleanConstructor
              ? boolean
              : InstanceType<T[K]['type']> extends DataType<infer T>
                ? T
                : never,
    ]
}[keyof T]

type EntityExport<T extends EntityExportDefinition> = (...args: EntityExportArgs<T>) => void

type EntitySharedMemoryLib<T extends object> = {
    get(index: number): ContainerType<T>
}

type EntityInfo = {
    readonly index: number
    readonly archetype: number
    readonly state: EntityState
}

type EntityInputResult = {
    judgment: Judgment
    accuracy: number
    readonly bucket: {
        index: number
        value: number
    }
}

export class Archetype {
    name = ''
    index = 0

    hasInput = false

    preprocessOrder = 0
    preprocess(): void {}

    spawnOrderOrder = 0
    spawnOrder(): number {
        return 0
    }

    shouldSpawnOrder = 0
    shouldSpawn(): boolean {
        return true
    }

    initialize(): void {}

    updateSequentialOrder = 0
    updateSequential(): void {}

    touchOrder = 0
    touch(): void {}

    updateParallel(): void {}

    terminate(): void {}

    protected get life(): ArchetypeLife {
        return life.archetypes.get(this.index)
    }

    private readonly _entityImports: EnginePlayDataArchetype['imports'] = []
    protected defineImport<T extends EntityImportDefinition>(type: T): EntityImport<T> {
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        if (compiler.isCompiling) throw 'defineImport can only be called at compile time'

        const data = Object.entries(type).map(([key, { name }], index) => ({
            key,
            name,
            offset: this._entityImports.length + index,
        }))

        for (const { name, offset: index } of data) {
            this._entityImports.push({
                name,
                index,
            })
        }

        // eslint-disable-next-line @typescript-eslint/only-throw-error
        if (data.length > 32) throw 'Max defineImport capacity (32) reached'

        return {
            ...Object.fromEntries(
                data.map(({ key, offset }) => [key, preprocessWritablePointer(4001, offset, 0, 0)]),
            ),

            names: Object.fromEntries(Object.entries(type).map(([key, { name }]) => [key, name])),

            ...defineLib<EntityImportLib<T>>({
                get: {
                    [Intrinsic.Call]: (ir, _, [index], ctx) =>
                        ctx.value(
                            ir,
                            Object.fromEntries(
                                data.map(({ key, offset }) => [
                                    key,
                                    preprocessWritablePointer(
                                        4101,
                                        offset,
                                        () => ctx.value(ir, index),
                                        32,
                                    ),
                                ]),
                            ),
                        ),
                },
            }),
        } as never
    }

    private readonly _entityExportKeys: string[] = []
    private readonly _entityExports: EnginePlayDataArchetype['exports'] = []
    protected defineExport<T extends EntityExportDefinition>(type: T): EntityExport<T> {
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        if (compiler.isCompiling) throw 'defineExport can only be called at compile time'

        for (const [key, { name }] of Object.entries(type)) {
            // eslint-disable-next-line @typescript-eslint/only-throw-error
            if (this._entityExports.includes(name)) throw `Duplicate export: ${name}`

            this._entityExportKeys.push(key)
            this._entityExports.push(name)
        }

        return (key, value) => {
            const index = this._entityExportKeys.indexOf(key as string)
            // eslint-disable-next-line @typescript-eslint/only-throw-error
            if (index === -1) throw `Export not found: ${key as string}`

            native.ExportValue(index, value)
        }
    }

    private _sharedMemoryOffset = 0
    protected defineSharedMemory<const T extends object>(
        type: T,
    ): ContainerType<T> & EntitySharedMemoryLib<T> {
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        if (compiler.isCompiling) throw 'defineSharedMemory can only be called at compile time'

        const start = this._sharedMemoryOffset

        const allocate = (size: number) => {
            const start = this._sharedMemoryOffset
            this._sharedMemoryOffset += size

            // eslint-disable-next-line @typescript-eslint/only-throw-error
            if (this._sharedMemoryOffset > 32) throw 'Max defineSharedMemory capacity (32) reached'

            return [...Array(size).keys()].map((i) =>
                singleThreadedWritablePointer(4002, start + i, 0, 0),
            )
        }

        const container = readContainer(type, allocate)

        return Object.assign(
            container as never,
            defineLib<EntitySharedMemoryLib<T>>({
                get: {
                    [Intrinsic.Call]: (ir, _, [index], ctx) => {
                        let offset = start
                        const allocate = (size: number) => {
                            const start = offset
                            offset += size

                            return [...Array(size).keys()].map((i) =>
                                singleThreadedWritablePointer(
                                    4102,
                                    start + i,
                                    () => ctx.value(ir, index),
                                    32,
                                ),
                            )
                        }

                        return ctx.value(ir, readContainer(type, allocate))
                    },
                },
            }),
        )
    }

    private readonly _entityMemory = createDefineBlock('entityMemory', 4000, 64, allWritablePointer)
    protected entityMemory<const T extends object>(type: T): ContainerType<T> {
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        if (compiler.isCompiling) throw 'entityMemory can only be called at compile time'

        return this._entityMemory(type)
    }

    protected readonly info: EntityInfo = {
        index: readonlyPointer(4003, 0, 0, 0),
        archetype: readonlyPointer(4003, 1, 0, 0),
        state: readonlyPointer(4003, 2, 0, 0),
    }

    protected despawn: boolean = allWritablePointer(4004, 0, 0, 0)

    protected readonly result: EntityInputResult = {
        judgment: allWritablePointer(4005, 0, 0, 0),
        accuracy: allWritablePointer(4005, 1, 0, 0),
        bucket: {
            index: allWritablePointer(4005, 2, 0, 0),
            value: allWritablePointer(4005, 3, 0, 0),
        },
    }
}
