import { visit } from '../../../../../utils/visitor.js'
import { IR } from '../../../../nodes/index.js'
import { PropagateState } from '../state.js'
import { transferPropagateSet } from './Set.js'

export type TransferPropagateIR<N extends IR> = (ir: N, input: PropagateState) => PropagateState

export const transferPropagateIR = visit<TransferPropagateIR<IR>>().create(
    'transferPropagate',
    {
        transferPropagateSet,
    },
    (_, input) => input,
)
