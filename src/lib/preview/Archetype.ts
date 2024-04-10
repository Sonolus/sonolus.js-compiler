/* eslint-disable @typescript-eslint/no-empty-function */

import { EngineArchetypeDataName, EnginePlayDataArchetype } from '@sonolus/core'
import { Intrinsic } from '../../intrinsic/index.js'
import { readContainer } from '../shared/blocks/utils.js'
import { ContainerType } from '../shared/containers/ContainerType.js'
import { DataType } from '../shared/containers/DataType.js'
import { defineLib } from '../shared/define/lib.js'
import { compiler } from './compiler.js'
import { preprocessWritablePointer, readonlyPointer } from './utils/pointer.js'

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

type EntitySharedMemoryLib<T extends object> = {
    get(index: number): ContainerType<T>
}

type EntityInfo = {
    readonly index: number
    readonly archetype: number
}

export class Archetype {
    name = ''
    index = 0

    preprocessOrder = 0
    preprocess(): void {}

    render(): void {}

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
                data.map(({ key, offset }) => [key, preprocessWritablePointer(4000, offset, 0, 0)]),
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
                                        4100,
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
                preprocessWritablePointer(4001, start + i, 0, 0),
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
                                preprocessWritablePointer(
                                    4101,
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

    protected readonly info: EntityInfo = {
        index: readonlyPointer(4002, 0, 0, 0),
        archetype: readonlyPointer(4002, 1, 0, 0),
    }
}
