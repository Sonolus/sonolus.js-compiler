import { visit } from '../../../../../utils/visitor.js'
import { IR } from '../../../../nodes/index.js'
import { EliminateState } from '../state.js'
import { transferEliminateGet } from './Get.js'
import { transferEliminateSet } from './Set.js'

export type TransferEliminateIR<N extends IR> = (ir: N, input: EliminateState) => EliminateState

export const transferEliminateIR = visit<TransferEliminateIR<IR>>().create(
    'transferEliminate',
    {
        transferEliminateGet,
        transferEliminateSet,
    },
    (_, input) => input,
)
