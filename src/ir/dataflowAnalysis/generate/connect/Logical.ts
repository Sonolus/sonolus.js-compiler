import { Logical } from '../../../nodes/Logical.js'
import { connectIns } from './context.js'
import { ConnectIR, connectIR } from './index.js'

export const connectLogical: ConnectIR<Logical> = (ir, inputs, ctx) => {
    const lhs = connectIR(ir.lhs, inputs, ctx)
    const rhs = connectIR(ir.rhs, lhs, ctx)

    connectIns(ir, [...lhs, ...rhs], ctx)

    return [ir]
}
