import { Set } from '../../../nodes/Set.js'
import { TrackInlineIR, trackInlineIR } from './index.js'

export const trackInlineSet: TrackInlineIR<Set> = (ir, ctx) => {
    const value = trackInlineIR(ir.value, ctx)

    if (value.sideEffect) ctx.sideEffects.add(ir)

    for (const dependency of value.dependencies) {
        const targets = ctx.dependencies.get(dependency)
        if (targets) {
            targets.add(ir.target)
        } else {
            ctx.dependencies.set(dependency, new Set([ir.target]))
        }
    }

    return value
}
