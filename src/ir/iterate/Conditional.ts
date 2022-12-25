import { Conditional } from '../nodes/Conditional.js'
import { IterateIR } from './index.js'

export const iterateConditional: IterateIR<Conditional> = (ir) => [
    ir.test,
    ir.consequent,
    ir.alternate,
]
