import { Block } from '../../nodes/Block.js'
import { IR } from '../../nodes/index.js'
import { Graph } from '../graph.js'
import { ConnectIRContext } from './connect/context.js'
import { connectIR } from './connect/index.js'

export const generate = (ir: IR, irs: IR[]): Graph => {
    const ctx: ConnectIRContext = {
        blocks: new Map(
            irs.filter((ir): ir is Block => ir.type === 'Block').map((ir) => [ir.target, ir]),
        ),
        ins: new Map(irs.map((ir) => [ir, new Set()])),
    }

    connectIR(ir, [], ctx)

    const outs = new Map(irs.map((ir) => [ir, new Set<IR>()]))

    for (const [inKey, inValues] of ctx.ins) {
        for (const outKey of inValues) {
            const outValues = outs.get(outKey)
            if (!outValues) throw 'Unexpected missing values'

            outValues.add(inKey)
        }
    }

    return {
        ins: ctx.ins,
        outs: outs,
    }
}
