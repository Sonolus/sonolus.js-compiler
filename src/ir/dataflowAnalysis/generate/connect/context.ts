import { IR } from '../../../nodes/index.js'

export type ConnectIRContext = {
    blocks: ReadonlyMap<object, IR>
    ins: Map<IR, Set<IR>>
}

export const connectIns = (ir: IR, inputs: IR[], ctx: ConnectIRContext): void => {
    const ins = ctx.ins.get(ir)
    if (!ins) throw new Error('Unexpected missing ins')

    for (const input of inputs) {
        ins.add(input)
    }
}
