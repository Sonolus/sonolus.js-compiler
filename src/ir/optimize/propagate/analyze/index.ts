import { dataAnalysisForwardIR } from '../../../dataflowAnalysis/forward/index.js'
import { IR } from '../../../nodes/index.js'
import { comparePropagateStates } from './compare.js'
import { meetPropagateStates } from './meet.js'
import { PropagateState, PropagateStates } from './state.js'
import { transferPropagateIR } from './transfer/index.js'

export const analyzePropagateIR = (ir: IR, irs: IR[]): PropagateStates => {
    const initial: PropagateState = []
    const states: PropagateStates = new Map(irs.map((ir) => [ir, []]))

    dataAnalysisForwardIR(ir, irs, initial, states, {
        transfer: transferPropagateIR,
        meet: meetPropagateStates,
        compare: comparePropagateStates,
    })

    return states
}
