import { Binary } from '../nodes/Binary.js'
import { IterateIR } from './index.js'

export const iterateBinary: IterateIR<Binary> = (ir) => [ir.lhs, ir.rhs]
