import { Throw } from '../nodes/Throw.js'
import { IterateIR } from './index.js'

export const iterateThrow: IterateIR<Throw> = (ir) => [ir.arg]
