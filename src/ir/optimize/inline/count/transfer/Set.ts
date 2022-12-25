import { Set } from '../../../../nodes/Set.js'
import { TransferCountInlineStateIR } from './index.js'

export const transferCountInlineSet: TransferCountInlineStateIR<Set> = (
    ir,
    input,
    dependencies,
) => {
    const oldElement = input.refs.get(ir.target)
    const targets = dependencies.get(ir.target)

    if (!oldElement && !targets?.size) return input

    const output = {
        refs: new Map(input.refs),
        counts: new Map(input.counts),
    }

    if (oldElement) {
        output.refs.delete(ir.target)
        output.counts.set(ir, targets?.has(ir.target) && output.counts.has(ir) ? 'T' : oldElement)
    }

    if (targets?.size) {
        for (const target of targets) {
            if (!output.refs.has(target)) continue

            output.refs.set(target, 'T')
        }
    }

    return output
}
