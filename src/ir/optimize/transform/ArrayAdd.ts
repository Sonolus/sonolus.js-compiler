import { Intrinsic } from '../../../intrinsic/index.js'
import { ArrayAdd } from '../../nodes/ArrayAdd.js'
import { TransformIR } from './index.js'
import { isReference, rewriteAsExecute, transformIRAndGet } from './utils.js'

export const transformArrayAdd: TransformIR<ArrayAdd> = (ir, ctx) => {
    const value = transformIRAndGet(ir.value, ctx)

    const result = isReference(value)
    if (result) {
        ir.array.push(result.value)

        return rewriteAsExecute(ir, ctx, [value, ctx.zero(ir)])
    }

    const temp = ctx.allocate()
    ir.array.push(temp)

    return rewriteAsExecute(ir, ctx, [temp[Intrinsic.Set](ir, value, ctx), ctx.zero(ir)])
}
