import { visit } from '../../../../utils/visitor.js'
import { iterateIR } from '../../../iterate/index.js'
import { IR } from '../../../nodes/index.js'
import { TrackInlineIRContext } from './context.js'
import { trackInlineGet } from './Get.js'
import { trackInlineNative } from './Native.js'
import { trackInlineSet } from './Set.js'

export type TrackInlineIR<N extends IR> = (
    ir: N,
    ctx: TrackInlineIRContext,
) => {
    sideEffect: boolean
    dependencies: object[]
}

export const trackInlineIR = visit<TrackInlineIR<IR>>().create(
    'trackInline',
    {
        trackInlineGet,
        trackInlineNative,
        trackInlineSet,
    },
    (ir, ctx) => {
        const sum = {
            sideEffect: false,
            dependencies: [] as object[],
        }

        for (const child of iterateIR(ir)) {
            const result = trackInlineIR(child, ctx)

            sum.sideEffect ||= result.sideEffect
            sum.dependencies.push(...result.dependencies)
        }

        if (sum.sideEffect) ctx.sideEffects.add(ir)

        return sum
    },
)
