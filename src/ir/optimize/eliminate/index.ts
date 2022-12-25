import { collectIR } from '../../collect/index.js'
import { IR } from '../../nodes/index.js'
import { analyzeEliminateIR } from './analyze/index.js'
import { applyEliminateIR } from './apply/index.js'

export const eliminateIR = (ir: IR): { ir: IR; changed: boolean } => {
    const irs = collectIR(ir)
    const states = analyzeEliminateIR(ir, irs)

    return applyEliminateIR(ir, states)
}
