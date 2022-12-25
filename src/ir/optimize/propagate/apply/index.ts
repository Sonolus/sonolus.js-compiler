import { mapIR } from '../../../map/index.js'
import { IR } from '../../../nodes/index.js'
import { replaceIR } from '../../../replace/index.js'
import { PropagateStates } from '../analyze/state.js'

export const applyPropagateIR = (ir: IR, states: PropagateStates): { ir: IR; changed: boolean } => {
    const replacements = new Map(
        [...states.entries()].flatMap(([ir, state]): [IR, IR][] => {
            if (ir.type !== 'Get') return []

            const element = state.get(ir.target)
            if (!element || element === 'T') return []

            return [[ir, mapIR(element)]]
        }),
    )

    return replaceIR(ir, replacements)
}
