import { dataAnalysisBackwardIR } from '../../../dataflowAnalysis/backward/index.js'
import { IR } from '../../../nodes/index.js'
import { compareEliminateStates } from './compare.js'
import { meetEliminateStates } from './meet.js'
import { EliminateState, EliminateStates } from './state.js'
import { transferEliminateIR } from './transfer/index.js'

export const analyzeEliminateIR = (ir: IR, irs: IR[]): EliminateStates => {
    const input: EliminateState = new Set()
    const states: EliminateStates = new Map(irs.map((ir) => [ir, new Set()]))

    dataAnalysisBackwardIR(ir, irs, input, states, {
        transfer: transferEliminateIR,
        meet: meetEliminateStates,
        compare: compareEliminateStates,
    })

    return states
}
