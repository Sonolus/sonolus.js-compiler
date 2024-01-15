import { createDefineBuckets } from '../../shared/define/buckets.js'
import { preprocessWritablePointer } from '../utils/pointer.js'

export const defineBuckets = createDefineBuckets((x, y, s) =>
    preprocessWritablePointer(2003, x, y, s),
)
