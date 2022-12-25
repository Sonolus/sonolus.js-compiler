import { ArrayDestructor } from '../nodes/ArrayDestructor.js'
import { IterateIR } from './index.js'

export const iterateArrayDestructor: IterateIR<ArrayDestructor> = (ir) => [ir.array]
