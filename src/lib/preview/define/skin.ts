import { createDefineSkin } from '../../shared/define/skin.js'
import { preprocessWritablePointer } from '../utils/pointer.js'

export const defineSkin = createDefineSkin((x, y, s) => preprocessWritablePointer(1002, x, y, s))
