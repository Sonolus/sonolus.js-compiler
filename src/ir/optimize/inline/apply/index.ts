import { IR } from '../../../nodes/index.js'
import { replaceIR } from '../../../replace/index.js'
import { CountInlineState } from '../count/state.js'
import { FindInlineStates } from '../find/state.js'

export const applyInlineIR = (
    ir: IR,
    sideEffects: Set<IR>,
    countState: CountInlineState,
    findStates: FindInlineStates,
): { ir: IR; changed: boolean } => {
    const replacements = new Map(
        [...findStates.entries()].flatMap(([ir, state]): [IR, IR][] => {
            if (ir.type !== 'Get') return []

            const element = state.get(ir.target)
            if (!element || element === 'T') return []

            const count = countState.counts.get(element)
            if (count !== 1) return []

            if (sideEffects.has(element)) return []

            return [
                [
                    element,
                    {
                        stackTraces: element.stackTraces,
                        env: element.env,

                        type: 'Value',
                        value: 0,
                        thisValue: undefined,
                        isSuper: false,
                    },
                ],
                [ir, element.value],
            ]
        }),
    )

    return replaceIR(ir, replacements)
}
