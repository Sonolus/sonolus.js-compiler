import { Intrinsic } from '../../intrinsic/index.js'
import { Archetype } from './Archetype.js'

export type SpawnDataDefinition = Record<string, NumberConstructor | BooleanConstructor>

type SpawnData<T extends SpawnDataDefinition> = {
    [K in keyof T]: T[K] extends NumberConstructor
        ? number
        : T[K] extends BooleanConstructor
        ? boolean
        : never
}

export type SpawnableArchetype<T extends SpawnDataDefinition> = Archetype & {
    spawnData: SpawnData<T>

    spawn(data: SpawnData<T>): void
}

export const SpawnableArchetype = <T extends SpawnDataDefinition>(
    spawnData: T,
): new () => SpawnableArchetype<T> => {
    return class extends Archetype {
        spawnData = this.entityMemory(spawnData) as never

        spawn = {
            [Intrinsic.Call]: (ir, thisValue, [data], ctx) =>
                ctx.Native(ir, {
                    func: 'Spawn',
                    args: [
                        ctx.value(ir, (thisValue as Archetype).index),
                        ...Object.keys(spawnData).map((key) => ctx.value(ir, (data as never)[key])),
                    ],
                }),
        } satisfies Intrinsic<'Call'> as never
    }
}
