import { While } from '../nodes/While.js'
import { IterateIR } from './index.js'

export const iterateWhile: IterateIR<While> = (ir) => [ir.test, ir.body]
