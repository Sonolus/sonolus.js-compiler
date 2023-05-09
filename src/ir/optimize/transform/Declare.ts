import { Intrinsic } from '../../../intrinsic/index.js'
import { Declare } from '../../nodes/Declare.js'
import { transformIR, TransformIR } from './index.js'
import { isReference, isResolved, rewriteAsExecute, transformIRAndGet } from './utils.js'

export const transformDeclare: TransformIR<Declare> = (ir, ctx) => {
    const value = transformIRAndGet(ir.value, ctx)

    if (!isResolved(value)) return { ...ir, value }

    const result = isReference(value)
    if (result) {
        ir.env.lexical.set(ir, ir.name, result.value, ctx)

        return rewriteAsExecute(ir, ctx, [value, ctx.zero(ir)])
    }

    const temp = ctx.allocate()
    ir.env.lexical.set(ir, ir.name, temp, ctx)

    return transformIR(temp[Intrinsic.Set](ir, value, ctx), ctx)
}
