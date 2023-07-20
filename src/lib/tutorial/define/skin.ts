import { createDefineSkin } from '../../shared/define/skin.js'
import { allWritablePointer } from '../utils/pointer.js'

export const defineSkin = createDefineSkin((x, y, s) => allWritablePointer(1002, x, y, s))
