import { visit } from '../../../../../utils/visitor.js'
import { IR } from '../../../../nodes/index.js'
import { FindInlineState } from '../state.js'
import { transferFindInlineSet } from './Set.js'

export type TransferFindInlineStateIR<N extends IR> = (
    ir: N,
    input: FindInlineState,
) => FindInlineState

export const transferFindInlineIR = visit<TransferFindInlineStateIR<IR>>().create(
    'transferFindInline',
    {
        transferFindInlineSet,
    },
    (_, input) => input,
)
