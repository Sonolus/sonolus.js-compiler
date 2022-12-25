import { head } from '../../../head/index.js'
import { DoWhile } from '../../../nodes/DoWhile.js'
import { connectIns } from './context.js'
import { ConnectIR, connectIR } from './index.js'

export const connectDoWhile: ConnectIR<DoWhile> = (ir, inputs, ctx) => {
    const body = connectIR(ir.body, inputs, ctx)
    const test = connectIR(ir.test, body, ctx)

    connectIns(head(ir.body), test, ctx)
    connectIns(ir, test, ctx)

    return [ir]
}
