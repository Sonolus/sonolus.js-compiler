import { Assign } from '../nodes/Assign.js'
import { IterateIR } from './index.js'

export const iterateAssign: IterateIR<Assign> = (ir) => [ir.lhs, ir.rhs]
