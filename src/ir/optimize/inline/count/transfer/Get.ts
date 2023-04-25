import { myMapGet, myMapSet } from '../../../../../utils/MyMap.js'
import { Get } from '../../../../nodes/Get.js'
import { TransferCountInlineStateIR } from './index.js'

export const transferCountInlineGet: TransferCountInlineStateIR<Get> = (ir, input) => {
    const outputRefs = [...input.refs]

    const oldElement = myMapGet(input.refs, ir.target)
    myMapSet(outputRefs, ir.target, oldElement ? 'T' : 1)

    return {
        refs: outputRefs,
        counts: input.counts,
    }
}
