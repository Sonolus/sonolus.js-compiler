import { createScore } from '../shared/score.js'
import { preprocessWritablePointer } from './utils/pointer.js'

export const score = createScore((x, y, s) => preprocessWritablePointer(2004, x, y, s))
