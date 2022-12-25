import { Conditional } from '../../../nodes/Conditional.js'
import { connectIns } from './context.js'
import { ConnectIR, connectIR } from './index.js'

export const connectConditional: ConnectIR<Conditional> = (ir, inputs, ctx) => {
    const test = connectIR(ir.test, inputs, ctx)
    const consequent = connectIR(ir.consequent, test, ctx)
    const alternate = connectIR(ir.alternate, test, ctx)

    connectIns(ir, [...consequent, ...alternate], ctx)

    return [ir]
}
