import { ForOf } from '../nodes/ForOf.js'
import { IterateIR } from './index.js'

export const iterateForOf: IterateIR<ForOf> = (ir) => [ir.value]
