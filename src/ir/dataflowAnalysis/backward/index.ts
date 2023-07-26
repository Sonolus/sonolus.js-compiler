import { IR } from '../../nodes/index.js'
import { generate } from '../generate/index.js'
import { StateOperators, States } from '../state.js'
import { meetAll } from '../utils.js'

export const dataAnalysisBackwardIR = <T>(
    ir: IR,
    irs: IR[],
    initial: T,
    states: States<T>,
    operators: StateOperators<T>,
): void => {
    const { transfer, meet, compare } = operators

    const graph = generate(ir, irs)
    const workList = [...irs]

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unnecessary-condition
    while ((ir = workList.shift()!)) {
        const inputs = graph.outs.get(ir)
        if (!inputs) throw new Error('Unexpected missing outs')

        const inputStates = [...inputs].map((ir) => {
            const state = states.get(ir)
            if (!state) throw new Error('Unexpected missing state')

            return transfer(ir, state)
        })

        const output = meetAll(initial, inputStates, meet)

        const oldState = states.get(ir)
        if (!oldState) throw new Error('Unexpected missing old state')

        if (compare(output, oldState)) continue

        states.set(ir, output)

        const ins = graph.ins.get(ir)
        if (!ins) throw new Error('Unexpected missing ins')

        for (const ir of ins) {
            if (workList.includes(ir)) continue

            workList.push(ir)
        }
    }
}
