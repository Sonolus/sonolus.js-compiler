import { visit } from '../../../../utils/visitor.js'
import { iterateIR } from '../../../iterate/index.js'
import { IR } from '../../../nodes/index.js'
import { connectBreak } from './Break.js'
import { connectConditional } from './Conditional.js'
import { connectIns, ConnectIRContext } from './context.js'
import { connectDoWhile } from './DoWhile.js'
import { connectLogical } from './Logical.js'
import { connectWhile } from './While.js'

export type ConnectIR<N extends IR> = (ir: N, inputs: IR[], ctx: ConnectIRContext) => IR[]

export const connectIR = visit<ConnectIR<IR>>().create(
    'connect',
    {
        connectBreak,
        connectConditional,
        connectDoWhile,
        connectLogical,
        connectWhile,
    },
    (ir, inputs, ctx) => {
        for (const child of iterateIR(ir)) {
            inputs = connectIR(child, inputs, ctx)
        }

        connectIns(ir, inputs, ctx)

        return [ir]
    },
)
