import { IR } from '../../nodes/index.js'
import { generate } from '../generate/index.js'
import { StateOperators, States } from '../state.js'
import { meetAll } from '../utils.js'

export const dataAnalysisForwardIR = <T>(
    ir: IR,
    irs: IR[],
    initial: T,
    states: States<T>,
    operators: StateOperators<T>,
): void => {
    const { transfer, meet, compare } = operators

    const graph = generate(ir, irs)
    const workList = new Set(irs)

    while (workList.size) {
        ;[ir] = workList
        workList.delete(ir)

        const inputs = graph.ins.get(ir)
        if (!inputs) throw 'Unexpected missing ins'

        const inputStates = [...inputs].map((ir) => {
            const state = states.get(ir)
            if (!state) throw 'Unexpected missing state'

            return state
        })

        const input = meetAll(initial, inputStates, meet)

        const output = transfer(ir, input)

        const oldState = states.get(ir)
        if (!oldState) throw 'Unexpected missing old state'

        if (compare(output, oldState)) continue

        states.set(ir, output)

        const outs = graph.outs.get(ir)
        if (!outs) throw 'Unexpected missing outs'

        for (const ir of outs) {
            workList.add(ir)
        }
    }
}
