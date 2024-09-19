import { EngineDataBucket } from '@sonolus/core'
import { JudgmentWindows } from '../../shared/JudgmentWindows.js'
import { defineLib } from '../../shared/define/lib.js'
import { Range, RangeLike } from '../containers/Range.js'

export type BucketRange = {
    min: number
    max: number
    readonly range: Range

    set(range: RangeLike): void
}

export type Bucket = {
    readonly index: number
    readonly perfect: BucketRange
    readonly great: BucketRange
    readonly good: BucketRange

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
                            get range() {
                                return new Range(this as never)
                            },

                            set(range: RangeLike) {
                                ;({ min: this.min, max: this.max } = range)
                            },
                        },
                        great: {
                            min: pointer(2, index, 6),
                            max: pointer(3, index, 6),
                            get range() {
                                return new Range(this as never)
                            },

                            set(range: RangeLike) {
                                ;({ min: this.min, max: this.max } = range)
                            },
                        },
                        good: {
                            min: pointer(4, index, 6),
                            max: pointer(5, index, 6),
                            get range() {
                                return new Range(this as never)
                            },

                            set(range: RangeLike) {
                                ;({ min: this.min, max: this.max } = range)
                            },
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
