import { createDefineBlock } from '../../shared/blocks/utils.js'
import { preprocessWritablePointer } from '../utils/pointer.js'

export const previewData = createDefineBlock('previewData', 2000, 4096, preprocessWritablePointer)
