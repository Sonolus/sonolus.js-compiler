import { dataAnalysisForwardIR } from '../../../dataflowAnalysis/forward/index.js'
import { IR } from '../../../nodes/index.js'
import { Set } from '../../../nodes/Set.js'
import { compareFindInlineStates } from './compare.js'
import { meetFindInlineStates } from './meet.js'
import { FindInlineState, FindInlineStates } from './state.js'
import { transferFindInlineIR } from './transfer/index.js'

export const findInlineIR = (
    ir: IR,
    irs: IR[],
): { states: FindInlineStates; merged: ReadonlySet<Set> } => {
    const input: FindInlineState = []
    const states: FindInlineStates = new Map(irs.map((ir) => [ir, []]))

    const merged = new globalThis.Set<Set>()

    dataAnalysisForwardIR(ir, irs, input, states, {
        transfer: transferFindInlineIR,
        meet: (a, b) => meetFindInlineStates(a, b, merged),
        compare: compareFindInlineStates,
    })

    return { states, merged }
}
