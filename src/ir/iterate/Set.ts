import { Set } from '../nodes/Set.js'
import { IterateIR } from './index.js'

export const iterateSet: IterateIR<Set> = (ir) => [ir.value]
