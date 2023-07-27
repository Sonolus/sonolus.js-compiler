/* eslint-disable @typescript-eslint/no-empty-function */

import { EngineArchetypeDataName, EnginePlayDataArchetype } from 'sonolus-core'
import { Intrinsic } from '../../intrinsic/index.js'
import { createDefineBlock, readContainer } from '../shared/blocks/utils.js'
import { ContainerType } from '../shared/containers/ContainerType.js'
import { DataType } from '../shared/containers/DataType.js'
import { defineLib } from '../shared/define/lib.js'
import { EntityState } from '../shared/enums/EntityState.js'
import { Judgment } from '../shared/enums/Judgment.js'
import { compiler } from './compiler.js'
import { ArchetypeLife, life } from './life.js'
import {
    allWritablePointer,
    preprocessWritablePointer,
    singleThreadedWritablePointer,
} from './utils/pointer.js'

type EntityDataDefinition = Record<
    string,
    {
        name: EngineArchetypeDataName | (string & {})
        type: NumberConstructor | BooleanConstructor | typeof DataType<number | boolean>
    }
>

type EntityDataType<T extends EntityDataDefinition> = {
    [K in keyof T]: T[K]['type'] extends NumberConstructor
        ? number
        : T[K]['type'] extends BooleanConstructor
        ? boolean
        : InstanceType<T[K]['type']> extends DataType<infer T>
        ? T
        : never
}

type EntityData<T extends EntityDataDefinition> = EntityDataType<T> & {
    names: {
        [K in keyof T]: T[K]['name']
    }
} & EntityDataLib<T>

type EntityDataLib<T extends EntityDataDefinition> = {
    get(index: number): EntityDataType<T>
}

type EntitySharedMemoryLib<T extends object> = {
    get(index: number): ContainerType<T>
}

type EntityInfo = {
    readonly index: number
    readonly archetype: number
    readonly state: EntityState
}

type InputResult = {
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

    private readonly _entityData: EnginePlayDataArchetype['data'] = []
    protected defineData<T extends EntityDataDefinition>(type: T): EntityData<T> {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        if (compiler.isCompiling) throw 'defineData can only be called at compile time'

        const data = Object.entries(type).map(([key, { name }], index) => ({
            key,
            name,
            offset: this._entityData.length + index,
        }))

        for (const { name, offset: index } of data) {
            this._entityData.push({
                name,
                index,
            })
        }

        if (data.length > 32) throw new Error('Max defineData capacity (32) reached')

        return {
            ...Object.fromEntries(
                data.map(({ key, offset }) => [key, preprocessWritablePointer(4001, offset, 0, 0)]),
            ),

            names: Object.fromEntries(Object.entries(type).map(([key, { name }]) => [key, name])),

            ...defineLib<EntityDataLib<T>>({
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

    private _sharedMemoryOffset = 0
    protected defineSharedMemory<const T extends object>(
        type: T,
    ): ContainerType<T> & EntitySharedMemoryLib<T> {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        if (compiler.isCompiling) throw 'defineSharedMemory can only be called at compile time'

        const start = this._sharedMemoryOffset

        const allocate = (size: number) => {
            const start = this._sharedMemoryOffset
            this._sharedMemoryOffset += size

            if (this._sharedMemoryOffset > 32)
                throw new Error('Max defineSharedMemory capacity (32) reached')

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
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        if (compiler.isCompiling) throw 'entityMemory can only be called at compile time'

        return this._entityMemory(type)
    }

    protected readonly info: EntityInfo = {
        index: allWritablePointer(4003, 0, 0, 0),
        archetype: allWritablePointer(4003, 1, 0, 0),
        state: allWritablePointer(4003, 2, 0, 0),
    }

    protected despawn: boolean = allWritablePointer(4004, 0, 0, 0)

    protected readonly result: InputResult = {
        judgment: allWritablePointer(4005, 0, 0, 0),
        accuracy: allWritablePointer(4005, 1, 0, 0),
        bucket: {
            index: allWritablePointer(4005, 2, 0, 0),
            value: allWritablePointer(4005, 3, 0, 0),
        },
    }
}
