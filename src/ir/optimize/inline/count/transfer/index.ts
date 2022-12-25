import { visit } from '../../../../../utils/visitor.js'
import { IR } from '../../../../nodes/index.js'
import { CountInlineState } from '../state.js'
import { transferCountInlineGet } from './Get.js'
import { transferCountInlineNative } from './Native.js'
import { transferCountInlineSet } from './Set.js'

export type TransferCountInlineStateIR<N extends IR> = (
    ir: N,
    input: CountInlineState,
    dependencies: ReadonlyMap<object, ReadonlySet<object>>,
) => CountInlineState

export const transferCountInlineIR = visit<TransferCountInlineStateIR<IR>>().create(
    'transferCountInline',
    {
        transferCountInlineGet,
        transferCountInlineNative,
        transferCountInlineSet,
    },
    (_, input) => input,
)
