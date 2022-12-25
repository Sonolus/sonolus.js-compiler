import { New } from '../nodes/New.js'
import { IterateIR } from './index.js'

export const iterateNew: IterateIR<New> = (ir) => [ir.callee, ir.args.init]
