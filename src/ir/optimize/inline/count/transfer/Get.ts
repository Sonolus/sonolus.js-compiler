import { Get } from '../../../../nodes/Get.js'
import { TransferCountInlineStateIR } from './index.js'

export const transferCountInlineGet: TransferCountInlineStateIR<Get> = (ir, input) => {
    const outputRefs = new Map(input.refs)

    const oldElement = input.refs.get(ir.target)
    outputRefs.set(ir.target, oldElement ? 'T' : 1)

    return {
        refs: outputRefs,
        counts: input.counts,
    }
}
