import { createLife } from '../shared/life.js'
import { preprocessWritablePointer } from './utils/pointer.js'

export const life = createLife(
    (x, y, s) => preprocessWritablePointer(5000, x, y, s),
    (x, y, s) => preprocessWritablePointer(2004, x, y, s),
)
