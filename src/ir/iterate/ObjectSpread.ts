import { ObjectSpread } from '../nodes/ObjectSpread.js'
import { IterateIR } from './index.js'

export const iterateObjectSpread: IterateIR<ObjectSpread> = (ir) => [ir.arg]
