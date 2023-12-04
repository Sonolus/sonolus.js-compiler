import { createDefineOption } from '../../shared/define/options.js'
import { readonlyPointer } from '../utils/pointer.js'

export const defineOptions = createDefineOption((x, y, s) => readonlyPointer(2002, x, y, s))
