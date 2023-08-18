import { createDebug } from '../shared/debug.js'
import { preprocessWritablePointer } from './utils/pointer.js'

export const debug = createDebug(preprocessWritablePointer(1000, 0, 0, 0))
