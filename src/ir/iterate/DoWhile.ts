import { DoWhile } from '../nodes/DoWhile.js'
import { IterateIR } from './index.js'

export const iterateDoWhile: IterateIR<DoWhile> = (ir) => [ir.body, ir.test]
