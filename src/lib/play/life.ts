import { Intrinsic } from '../../intrinsic/index.js'
import { IR } from '../../ir/nodes/index.js'
import { defineLib } from '../shared/define/lib.js'
import { preprocessWritablePointer } from './utils/pointer.js'

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

const createConsecutiveLife = (index: number) => ({
    increment: preprocessWritablePointer(2005, 0, index, 2),
    step: preprocessWritablePointer(2005, 1, index, 2),

    set(this: ConsecutiveLife, options: ConsecutiveLifeOptions) {
        ;({ increment: this.increment, step: this.step } = options)
    },
})

export const life = defineLib<Life>({
    archetypes: {
        get: {
            [Intrinsic.Call]: (ir, _, [index], ctx) =>
                ctx.value(
                    ir,
                    createArchetypeLife(() => ctx.value(ir, index)),
                ),
        },
    },
    consecutive: {
        perfect: createConsecutiveLife(0),
        great: createConsecutiveLife(1),
        good: createConsecutiveLife(2),
    },
})

const createArchetypeLife = (index: () => IR) => ({
    perfect: preprocessWritablePointer(5000, 0, index, 4),
    great: preprocessWritablePointer(5000, 1, index, 4),
    good: preprocessWritablePointer(5000, 2, index, 4),
    miss: preprocessWritablePointer(5000, 3, index, 4),

    set(this: ArchetypeLife, options: ArchetypeLifeOptions) {
        ;({ perfect: this.perfect, great: this.great, good: this.good, miss: this.miss } = options)
    },
})
