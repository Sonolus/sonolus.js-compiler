import { createBackground } from '../shared/background.js'
import { singleThreadedWritablePointer } from './utils/pointer.js'

export const background = createBackground((x, y, s) =>
    singleThreadedWritablePointer(1005, x, y, s),
)
