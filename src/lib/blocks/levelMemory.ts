import { singleThreadedWritablePointer } from '../utils/pointer.js'
import { createDefineBlock } from './utils.js'

export const levelMemory = createDefineBlock(
    'levelMemory',
    2000,
    4096,
    singleThreadedWritablePointer,
)
