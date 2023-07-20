import { EnginePlayDataBucket } from 'sonolus-core'
import { JudgmentWindows } from '../../shared/JudgmentWindows.js'
import { defineLib } from '../../shared/define/lib.js'
import { preprocessWritablePointer } from '../utils/pointer.js'

export type Bucket = {
    readonly index: number
    readonly perfect: {
        min: number
        max: number
    }
    readonly great: {
        min: number
        max: number
    }
    readonly good: {
        min: number
        max: number
    }

    set(windows: JudgmentWindows): void
}

type BucketsDefinition = Record<string, EnginePlayDataBucket>

type Buckets<T extends BucketsDefinition> = EnginePlayDataBucket[] & {
    [K in keyof T]: T[K] & Bucket
}

export const defineBuckets = <T extends BucketsDefinition>(buckets: T): Buckets<T> =>
    Object.assign(
        Object.values(buckets),
        Object.fromEntries(
            Object.entries(buckets).map(([name, bucket], index) => [
                name,
                defineLib<Bucket>({
                    ...bucket,

                    index,
                    perfect: {
                        min: preprocessWritablePointer(2003, 0, index, 6),
                        max: preprocessWritablePointer(2003, 1, index, 6),
                    },
                    great: {
                        min: preprocessWritablePointer(2003, 2, index, 6),
                        max: preprocessWritablePointer(2003, 3, index, 6),
                    },
                    good: {
                        min: preprocessWritablePointer(2003, 4, index, 6),
                        max: preprocessWritablePointer(2003, 5, index, 6),
                    },

                    set(windows: JudgmentWindows) {
                        ;({ min: this.perfect.min, max: this.perfect.max } = windows.perfect)
                        ;({ min: this.great.min, max: this.great.max } = windows.great)
                        ;({ min: this.good.min, max: this.good.max } = windows.good)
                    },
                }),
            ]),
        ),
    ) as never
