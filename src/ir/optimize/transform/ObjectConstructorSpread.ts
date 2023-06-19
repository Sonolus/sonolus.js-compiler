import { Intrinsic } from '../../../intrinsic/index.js'
import { isSpreadable } from '../../../utils/spreadable.js'
import { IR } from '../../nodes/index.js'
import { ObjectConstructorSpread } from '../../nodes/ObjectConstructorSpread.js'
import { TransformIR } from './index.js'
import {
    isConstant,
    isReference,
    isResolved,
    rewriteAsExecute,
    transformIRAndGet,
    unwrapIRGet,
} from './utils.js'

export const transformObjectConstructorSpread: TransformIR<ObjectConstructorSpread> = (ir, ctx) => {
    const arg = transformIRAndGet(ir.arg, ctx)

    const result = isConstant(arg)
    if (!result) return { ...ir, arg }

    if (!isSpreadable(result.value)) return { ...ir, arg }

    const inits: IR[] = []

    for (const entry of Object.entries(result.value)) {
        const key = entry[0]
        const value = unwrapIRGet(ctx.value(ir, entry[1]), ctx)

        if (!isResolved(value)) return { ...ir, arg }

        const result = isReference(value)
        if (result) {
            ir.object[key as never] = result.value as never

            inits.push(value)
            continue
        }

        const temp = ctx.allocate()
        ir.object[key as never] = temp as never

        inits.push(temp[Intrinsic.Set](ir, value, ctx))
    }

    return rewriteAsExecute(ir, ctx, [arg, ...inits, ctx.zero(ir)])
}
