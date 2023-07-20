import { createScreen } from '../shared/screen.js'
import { preprocessWritablePointer } from './utils/pointer.js'

export const screen = createScreen(preprocessWritablePointer(1000, 1, 0, 0))
