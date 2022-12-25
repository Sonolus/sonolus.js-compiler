import { JSCall } from '../nodes/JSCall.js'
import { IterateIR } from './index.js'

export const iterateJSCall: IterateIR<JSCall> = (ir) => ir.args
