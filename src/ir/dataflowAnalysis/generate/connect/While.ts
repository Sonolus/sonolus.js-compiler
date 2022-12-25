import { head } from '../../../head/index.js'
import { While } from '../../../nodes/While.js'
import { connectIns } from './context.js'
import { ConnectIR, connectIR } from './index.js'

export const connectWhile: ConnectIR<While> = (ir, inputs, ctx) => {
    const test = connectIR(ir.test, inputs, ctx)
    const body = connectIR(ir.body, test, ctx)

    connectIns(head(ir.test), body, ctx)
    connectIns(ir, test, ctx)

    return [ir]
}
