import { dataAnalysisBackwardIR } from '../../../dataflowAnalysis/backward/index.js'
import { head } from '../../../head/index.js'
import { IR } from '../../../nodes/index.js'
import { compareCountInlineStates } from './compare.js'
import { meetCountInlineStates } from './meet.js'
import { CountInlineState, CountInlineStates } from './state.js'
import { transferCountInlineIR } from './transfer/index.js'

export const countInlineIR = (
    ir: IR,
    irs: IR[],
    dependencies: ReadonlyMap<object, ReadonlySet<object>>,
): CountInlineState => {
    const input: CountInlineState = {
        refs: [],
        counts: [],
    }
    const states: CountInlineStates = new Map(
        irs.map((ir) => [
            ir,
            {
                refs: [],
                counts: [],
            },
        ]),
    )

    dataAnalysisBackwardIR(ir, irs, input, states, {
        transfer: (ir, input) => transferCountInlineIR(ir, input, dependencies),
        meet: meetCountInlineStates,
        compare: compareCountInlineStates,
    })

    const state = states.get(head(ir))
    if (!state) throw 'Unexpected missing state'

    return state
}
