import { ArraySpread } from '../nodes/ArraySpread.js'
import { IterateIR } from './index.js'

export const iterateArraySpread: IterateIR<ArraySpread> = (ir) => [ir.arg]
