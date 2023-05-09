import { Intrinsic } from '../../../intrinsic/index.js'
import { ArraySpread } from '../../nodes/ArraySpread.js'
import { IR } from '../../nodes/index.js'
import { TransformIR } from './index.js'
import {
    isConstant,
    isReference,
    isResolved,
    rewriteAsExecute,
    transformIRAndGet,
    unwrapIRGet,
} from './utils.js'

export const transformArraySpread: TransformIR<ArraySpread> = (ir, ctx) => {
    const arg = transformIRAndGet(ir.arg, ctx)

    const result = isConstant(arg)
    if (!result) return { ...ir, arg }

    const inits: IR[] = []

    for (const element of result.value as unknown[]) {
        const value = unwrapIRGet(ctx.value(ir, element), ctx)

        if (!isResolved(value)) return { ...ir, arg }

        const result = isReference(value)
        if (result) {
            ir.array.push(result.value)

            inits.push(value)
            continue
        }

        const temp = ctx.allocate()
        ir.array.push(temp)

        inits.push(temp[Intrinsic.Set](ir, value, ctx))
    }

    return rewriteAsExecute(ir, ctx, [arg, ...inits, ctx.zero(ir)])
}
