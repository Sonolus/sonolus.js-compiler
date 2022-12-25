import { Break } from '../nodes/Break.js'
import { IterateIR } from './index.js'

export const iterateBreak: IterateIR<Break> = (ir) => [ir.value]
