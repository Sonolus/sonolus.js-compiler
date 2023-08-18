import { createDefineParticle } from '../../shared/define/particle.js'
import { allWritablePointer } from '../utils/pointer.js'

export const defineParticle = createDefineParticle((x, y, s) => allWritablePointer(1003, x, y, s))
