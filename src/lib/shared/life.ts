import { Intrinsic } from '../../intrinsic/index.js'
import { IR } from '../../ir/nodes/index.js'
import { defineLib } from '../shared/define/lib.js'

type ArchetypeLifeOptions = {
    perfect: number
    great: number
    good: number
    miss: number
}

export type ArchetypeLife = ArchetypeLifeOptions & {
    set(options: ArchetypeLifeOptions): void
}

type ConsecutiveLifeOptions = {
    increment: number
    step: number
}

export type ConsecutiveLife = ConsecutiveLifeOptions & {
    set(options: ConsecutiveLifeOptions): void
}

type Life = {
    readonly archetypes: {
        get(index: number): ArchetypeLife
    }
    readonly consecutive: {
        readonly perfect: ConsecutiveLife
        readonly great: ConsecutiveLife
        readonly good: ConsecutiveLife
    }
}

export const createLife = (
    archetypeLifePointer: <T>(x: number, y: () => IR, s: number) => T,
    consecutiveLifePointer: <T>(x: number, y: number, s: number) => T,
): Life =>
    defineLib<Life>({
        archetypes: {
            get: {
                [Intrinsic.Call]: (ir, _, [index], ctx) =>
                    ctx.value(
                        ir,
                        createArchetypeLife(archetypeLifePointer, () => ctx.value(ir, index)),
                    ),
            },
        },
        consecutive: {
            perfect: createConsecutiveLife(consecutiveLifePointer, 0),
            great: createConsecutiveLife(consecutiveLifePointer, 1),
            good: createConsecutiveLife(consecutiveLifePointer, 2),
        },
    })

const createArchetypeLife = (
    pointer: <T>(x: number, y: () => IR, s: number) => T,
    index: () => IR,
) =>
    defineLib<ArchetypeLife>({
        perfect: pointer(0, index, 4),
        great: pointer(1, index, 4),
        good: pointer(2, index, 4),
        miss: pointer(3, index, 4),

        set(this: ArchetypeLife, options: ArchetypeLifeOptions) {
            ;({
                perfect: this.perfect,
                great: this.great,
                good: this.good,
                miss: this.miss,
            } = options)
        },
    })

const createConsecutiveLife = (pointer: <T>(x: number, y: number, s: number) => T, index: number) =>
    defineLib<ConsecutiveLife>({
        increment: pointer(0, index, 2),
        step: pointer(1, index, 2),

        set(this: ConsecutiveLife, options: ConsecutiveLifeOptions) {
            ;({ increment: this.increment, step: this.step } = options)
        },
    })
