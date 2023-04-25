import { myMapDelete, myMapGet, myMapHas, myMapSet } from '../../../../../utils/MyMap.js'
import { Set } from '../../../../nodes/Set.js'
import { TransferCountInlineStateIR } from './index.js'

export const transferCountInlineSet: TransferCountInlineStateIR<Set> = (
    ir,
    input,
    dependencies,
) => {
    const oldElement = myMapGet(input.refs, ir.target)
    const targets = dependencies.get(ir.target)

    if (!oldElement && !targets?.size) return input

    const output = {
        refs: [...input.refs],
        counts: [...input.counts],
    }

    if (oldElement) {
        myMapDelete(output.refs, ir.target)
        myMapSet(
            output.counts,
            ir,
            targets?.has(ir.target) && myMapHas(output.counts, ir) ? 'T' : oldElement,
        )
    }

    if (targets?.size) {
        for (const target of targets) {
            if (!myMapHas(output.refs, target)) continue

            myMapSet(output.refs, target, 'T')
        }
    }

    return output
}
