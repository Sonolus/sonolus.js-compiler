import { EngineDataBucket } from 'sonolus-core'
import { JudgmentWindows } from '../../shared/JudgmentWindows.js'
import { defineLib } from '../../shared/define/lib.js'

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

type BucketsDefinition = Record<string, EngineDataBucket>

type Buckets<T extends BucketsDefinition> = EngineDataBucket[] & {
    [K in keyof T]: T[K] & Bucket
}

export const createDefineBuckets =
    (pointer: <T>(x: number, y: number, s: number) => T) =>
    <T extends BucketsDefinition>(buckets: T): Buckets<T> =>
        Object.assign(
            Object.values(buckets),
            Object.fromEntries(
                Object.entries(buckets).map(([name, bucket], index) => [
                    name,
                    defineLib<Bucket>({
                        ...bucket,

                        index,
                        perfect: {
                            min: pointer(0, index, 6),
                            max: pointer(1, index, 6),
                        },
                        great: {
                            min: pointer(2, index, 6),
                            max: pointer(3, index, 6),
                        },
                        good: {
                            min: pointer(4, index, 6),
                            max: pointer(5, index, 6),
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
