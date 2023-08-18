import { createDefineBlock } from '../../shared/blocks/utils.js'
import { allWritablePointer } from '../utils/pointer.js'

export const tutorialMemory = createDefineBlock('tutorialMemory', 2000, 4096, allWritablePointer)
