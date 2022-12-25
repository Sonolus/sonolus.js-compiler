import { sideEffectFreeFuncs } from '../../../../../utils/funcs.js'
import { Native } from '../../../../nodes/Native.js'
import { TransferCountInlineStateIR } from './index.js'

export const transferCountInlineNative: TransferCountInlineStateIR<Native> = (ir, input) => {
    if (sideEffectFreeFuncs.includes(ir.func)) return input

    return {
        refs: new Map([...input.refs.keys()].map((key) => [key, 'T'])),
        counts: input.counts,
    }
}
