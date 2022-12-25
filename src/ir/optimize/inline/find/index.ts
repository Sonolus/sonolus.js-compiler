import { dataAnalysisForwardIR } from '../../../dataflowAnalysis/forward/index.js'
import { IR } from '../../../nodes/index.js'
import { compareFindInlineStates } from './compare.js'
import { meetFindInlineStates } from './meet.js'
import { FindInlineState, FindInlineStates } from './state.js'
import { transferFindInlineIR } from './transfer/index.js'

export const findInlineIR = (ir: IR, irs: IR[]): FindInlineStates => {
    const input: FindInlineState = new Map()
    const states: FindInlineStates = new Map(irs.map((ir) => [ir, new Map()]))

    dataAnalysisForwardIR(ir, irs, input, states, {
        transfer: transferFindInlineIR,
        meet: meetFindInlineStates,
        compare: compareFindInlineStates,
    })

    return states
}
