import { sideEffectFreeFuncs } from '../../../../utils/funcs.js'
import { iterateIR } from '../../../iterate/index.js'
import { Native } from '../../../nodes/Native.js'
import { TrackInlineIR, trackInlineIR } from './index.js'

export const trackInlineNative: TrackInlineIR<Native> = (ir, ctx) => {
    const sum = {
        sideEffect: !sideEffectFreeFuncs.includes(ir.func),
        dependencies: [] as object[],
    }

    for (const child of iterateIR(ir)) {
        const result = trackInlineIR(child, ctx)

        sum.sideEffect ||= result.sideEffect
        sum.dependencies.push(...result.dependencies)
    }

    if (sum.sideEffect) ctx.sideEffects.add(ir)

    return sum
}
