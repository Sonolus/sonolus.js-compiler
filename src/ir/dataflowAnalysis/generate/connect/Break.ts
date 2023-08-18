import { Break } from '../../../nodes/Break.js'
import { connectIns } from './context.js'
import { ConnectIR, connectIR } from './index.js'

export const connectBreak: ConnectIR<Break> = (ir, inputs, ctx) => {
    const value = connectIR(ir.value, inputs, ctx)

    const block = ctx.blocks.get(ir.target)
    if (!block) throw new Error('Unexpected missing block')

    connectIns(ir, value, ctx)
    connectIns(block, [ir], ctx)

    return []
}
