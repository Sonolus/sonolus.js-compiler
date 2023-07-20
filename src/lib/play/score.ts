import { defineLib } from '../shared/define/lib.js'
import { preprocessWritablePointer } from './utils/pointer.js'

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

const createConsecutiveScore = (index: number) => ({
    multiplier: preprocessWritablePointer(2004, 3, index, 3),
    step: preprocessWritablePointer(2004, 4, index, 3),
    cap: preprocessWritablePointer(2004, 5, index, 3),

    set(this: ConsecutiveScore, options: ConsecutiveScoreOptions) {
        ;({ multiplier: this.multiplier, step: this.step, cap: this.cap } = options)
    },
})

export const score = defineLib<Score>({
    base: {
        perfect: preprocessWritablePointer(2004, 0, 0, 1),
        great: preprocessWritablePointer(2004, 0, 1, 1),
        good: preprocessWritablePointer(2004, 0, 2, 1),

        set(this: BaseScore, options: BaseScoreOptions) {
            ;({ perfect: this.perfect, great: this.great, good: this.good } = options)
        },
    },
    consecutive: {
        perfect: createConsecutiveScore(0),
        great: createConsecutiveScore(1),
        good: createConsecutiveScore(2),
    },
})
