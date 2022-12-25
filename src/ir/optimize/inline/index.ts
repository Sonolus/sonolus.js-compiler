import { collectIR } from '../../collect/index.js'
import { IR } from '../../nodes/index.js'
import { applyInlineIR } from './apply/index.js'
import { countInlineIR } from './count/index.js'
import { findInlineIR } from './find/index.js'
import { TrackInlineIRContext } from './track/context.js'
import { trackInlineIR } from './track/index.js'

export const inlineIR = (ir: IR): { ir: IR; changed: boolean } => {
    const irs = collectIR(ir)

    const trackCtx: TrackInlineIRContext = {
        sideEffects: new Set(),
        dependencies: new Map(),
    }
    trackInlineIR(ir, trackCtx)

    const countState = countInlineIR(ir, irs, trackCtx.dependencies)

    const findStates = findInlineIR(ir, irs)

    return applyInlineIR(ir, trackCtx.sideEffects, countState, findStates)
}
