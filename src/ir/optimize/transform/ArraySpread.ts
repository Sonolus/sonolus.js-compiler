import { Intrinsic } from '../../../intrinsic/index.js'
import { mapIR } from '../../map/index.js'
import { ArraySpread } from '../../nodes/ArraySpread.js'
import { IR } from '../../nodes/index.js'
import { TransformIR } from './index.js'
import {
    isConstant,
    isReference,
    rewriteAsExecute,
    transformIRAndGet,
    unwrapIRGet,
} from './utils.js'

export const transformArraySpread: TransformIR<ArraySpread> = (ir, ctx) => {
    const arg = transformIRAndGet(ir.arg, ctx)
    const newIR = mapIR(ir, arg)

    const result = isConstant(arg)
    if (!result) return newIR

    const inits: IR[] = []

    for (const element of result.value as unknown[]) {
        const value = unwrapIRGet(ctx.value(newIR, element), ctx)

        const result = isReference(value)
        if (result) {
            newIR.array.push(result.value)

            inits.push(value)
            continue
        }

        const temp = ctx.allocate()
        newIR.array.push(temp)

        inits.push(temp[Intrinsic.Set](newIR, value, ctx))
    }

    return rewriteAsExecute(newIR, ctx, [arg, ...inits, ctx.zero(newIR)])
}
