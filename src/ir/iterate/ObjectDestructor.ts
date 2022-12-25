import { ObjectDestructor } from '../nodes/ObjectDestructor.js'
import { IterateIR } from './index.js'

export const iterateObjectDestructor: IterateIR<ObjectDestructor> = (ir) => [ir.object]
