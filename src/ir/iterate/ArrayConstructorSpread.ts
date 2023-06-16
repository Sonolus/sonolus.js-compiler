import { ArrayConstructorSpread } from '../nodes/ArrayConstructorSpread.js'
import { IterateIR } from './index.js'

export const iterateArrayConstructorSpread: IterateIR<ArrayConstructorSpread> = (ir) => [ir.arg]
