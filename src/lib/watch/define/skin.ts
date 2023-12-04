import { createDefineSkin } from '../../shared/define/skin.js'
import { singleThreadedWritablePointer } from '../utils/pointer.js'

export const defineSkin = createDefineSkin((x, y, s) =>
    singleThreadedWritablePointer(1002, x, y, s),
)
