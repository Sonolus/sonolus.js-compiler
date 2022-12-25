import { Unary } from '../nodes/Unary.js'
import { IterateIR } from './index.js'

export const iterateUnary: IterateIR<Unary> = (ir) => [ir.arg]
