import { createDefineSkin } from '../../shared/define/skin.js'
import { singleThreadedWritablePointer } from '../utils/pointer.js'

export const defineSkin = createDefineSkin((x, y, s) =>
    singleThreadedWritablePointer(1003, x, y, s),
)
