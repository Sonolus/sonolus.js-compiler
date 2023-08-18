import { createBackground } from '../shared/background.js'
import { allWritablePointer } from './utils/pointer.js'

export const background = createBackground((x, y, s) => allWritablePointer(1004, x, y, s))
