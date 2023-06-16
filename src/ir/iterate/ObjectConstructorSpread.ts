import { ObjectConstructorSpread } from '../nodes/ObjectConstructorSpread.js'
import { IterateIR } from './index.js'

export const iterateObjectConstructorSpread: IterateIR<ObjectConstructorSpread> = (ir) => [ir.arg]
