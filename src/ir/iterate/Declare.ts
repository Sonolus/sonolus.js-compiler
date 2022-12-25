import { Declare } from '../nodes/Declare.js'
import { IterateIR } from './index.js'

export const iterateDeclare: IterateIR<Declare> = (ir) => [ir.value]
