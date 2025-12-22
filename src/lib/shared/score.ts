import { Intrinsic } from '../../intrinsic/index.js'
import { IR } from '../../ir/nodes/index.js'
import { defineLib } from '../shared/define/lib.js'

type ArchetypeScoreOptions = {
    multiplier: number
}

export type ArchetypeScore = ArchetypeScoreOptions & {
    set(options: ArchetypeScoreOptions): void
}

type BaseScoreOptions = {
    perfect: number
    great: number
    good: number
}

type BaseScore = BaseScoreOptions & {
    set(options: BaseScoreOptions): void
}

type ConsecutiveScoreOptions = {
    multiplier: number
    step: number
    cap: number
}

export type ConsecutiveScore = ConsecutiveScoreOptions & {
    set(options: ConsecutiveScoreOptions): void
}

type Score = {
    readonly archetypes: {
        get(index: number): ArchetypeScore
    }
    readonly base: BaseScore
    readonly consecutive: {
        readonly perfect: ConsecutiveScore
        readonly great: ConsecutiveScore
        readonly good: ConsecutiveScore
    }
}

export const createScore = (
    archetypeScorePointer: <T>(x: number, y: () => IR, s: number) => T,
    levelScorePointer: <T>(x: number, y: number, s: number) => T,
): Score =>
    defineLib<Score>({
        archetypes: {
            get: {
                [Intrinsic.Call]: (ir, _, [index], ctx) =>
                    ctx.value(
                        ir,
                        createArchetypeScore(archetypeScorePointer, () => ctx.value(ir, index)),
                    ),
            },
        },
        base: {
            perfect: levelScorePointer(0, 0, 1),
            great: levelScorePointer(0, 1, 1),
            good: levelScorePointer(0, 2, 1),

            set(this: BaseScore, options: BaseScoreOptions) {
                ;({ perfect: this.perfect, great: this.great, good: this.good } = options)
            },
        },
        consecutive: {
            perfect: createConsecutiveScore(levelScorePointer, 0),
            great: createConsecutiveScore(levelScorePointer, 1),
            good: createConsecutiveScore(levelScorePointer, 2),
        },
    })

const createArchetypeScore = (
    pointer: <T>(x: number, y: () => IR, s: number) => T,
    index: () => IR,
) =>
    defineLib<ArchetypeScore>({
        multiplier: pointer(0, index, 1),

        set(this: ArchetypeScore, options: ArchetypeScoreOptions) {
            ;({ multiplier: this.multiplier } = options)
        },
    })

const createConsecutiveScore = (
    pointer: <T>(x: number, y: number, s: number) => T,
    index: number,
) =>
    defineLib<ConsecutiveScore>({
        multiplier: pointer(3, index, 3),
        step: pointer(4, index, 3),
        cap: pointer(5, index, 3),

        set(this: ConsecutiveScore, options: ConsecutiveScoreOptions) {
            ;({ multiplier: this.multiplier, step: this.step, cap: this.cap } = options)
        },
    })
