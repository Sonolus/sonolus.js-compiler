import { Logical } from '../nodes/Logical.js'
import { IterateIR } from './index.js'

export const iterateLogical: IterateIR<Logical> = (ir) => [ir.lhs, ir.rhs]
