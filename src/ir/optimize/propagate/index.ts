import { collectIR } from '../../collect/index.js'
import { IR } from '../../nodes/index.js'
import { analyzePropagateIR } from './analyze/index.js'
import { applyPropagateIR } from './apply/index.js'

export const propagateIR = (ir: IR): { ir: IR; changed: boolean } => {
    const irs = collectIR(ir)

    const states = analyzePropagateIR(ir, irs)

    return applyPropagateIR(ir, states)
}
