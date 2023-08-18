import { createDefineParticle } from '../../shared/define/particle.js'
import { singleThreadedWritablePointer } from '../utils/pointer.js'

export const defineParticle = createDefineParticle((x, y, s) =>
    singleThreadedWritablePointer(1004, x, y, s),
)
