import { createDefineBlock } from '../../shared/blocks/utils.js'
import { preprocessWritablePointer } from '../utils/pointer.js'

export const tutorialData = createDefineBlock('tutorialData', 2001, 4096, preprocessWritablePointer)
