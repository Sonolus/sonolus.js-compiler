import { sideEffectFreeFuncs } from '../../../../../utils/funcs.js'
import { Native } from '../../../../nodes/Native.js'
import { TransferCountInlineStateIR } from './index.js'

export const transferCountInlineNative: TransferCountInlineStateIR<Native> = (ir, input) => {
    if (sideEffectFreeFuncs.includes(ir.func)) return input

    return {
        refs: input.refs.map(({ k }) => ({ k, v: 'T' })),
        counts: input.counts,
    }
}
