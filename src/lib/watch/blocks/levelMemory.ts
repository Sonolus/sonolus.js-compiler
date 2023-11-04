import { createDefineBlock } from '../../shared/blocks/utils.js'
import { singleThreadedWritablePointer } from '../utils/pointer.js'

export const levelMemory = createDefineBlock(
    'levelMemory',
    2000,
    4096,
    singleThreadedWritablePointer,
)
