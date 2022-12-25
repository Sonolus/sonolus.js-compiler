import { IR } from '../../../nodes/index.js'
import { replaceIR } from '../../../replace/index.js'
import { EliminateStates } from '../analyze/state.js'

export const applyEliminateIR = (ir: IR, states: EliminateStates): { ir: IR; changed: boolean } => {
    const replacements = new Map(
        [...states.entries()].flatMap(([ir, state]): [IR, IR][] => {
            if (ir.type !== 'Set') return []

            if (state.has(ir.target)) return []

            return [[ir, ir.value]]
        }),
    )

    return replaceIR(ir, replacements)
}
