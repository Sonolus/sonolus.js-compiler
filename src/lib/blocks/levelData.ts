import { preprocessWritablePointer } from '../utils/pointer.js'
import { createDefineBlock } from './utils.js'

export const levelData = createDefineBlock('levelData', 2001, 4096, preprocessWritablePointer)
