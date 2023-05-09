import { Call } from '../nodes/Call.js'
import { IterateIR } from './index.js'

export const iterateCall: IterateIR<Call> = (ir) => [ir.callee, ir.args]
