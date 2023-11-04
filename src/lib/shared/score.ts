import { defineLib } from '../shared/define/lib.js'

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
    readonly base: BaseScore
    readonly consecutive: {
        readonly perfect: ConsecutiveScore
        readonly great: ConsecutiveScore
        readonly good: ConsecutiveScore
    }
}

export const createScore = (pointer: <T>(x: number, y: number, s: number) => T): Score =>
    defineLib<Score>({
        base: {
            perfect: pointer(0, 0, 1),
            great: pointer(0, 1, 1),
            good: pointer(0, 2, 1),

            set(this: BaseScore, options: BaseScoreOptions) {
                ;({ perfect: this.perfect, great: this.great, good: this.good } = options)
            },
        },
        consecutive: {
            perfect: createConsecutiveScore(pointer, 0),
            great: createConsecutiveScore(pointer, 1),
            good: createConsecutiveScore(pointer, 2),
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
