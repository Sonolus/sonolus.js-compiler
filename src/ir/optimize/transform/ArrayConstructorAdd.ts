import { Intrinsic } from '../../../intrinsic/index.js'
import { ArrayConstructorAdd } from '../../nodes/ArrayConstructorAdd.js'
import { TransformIR } from './index.js'
import { isReference, isResolved, rewriteAsExecute, transformIRAndGet } from './utils.js'

export const transformArrayConstructorAdd: TransformIR<ArrayConstructorAdd> = (ir, ctx) => {
    const value = transformIRAndGet(ir.value, ctx)

    if (!isResolved(value)) return { ...ir, value }

    const result = isReference(value)
    if (result) {
        ir.array.push(result.value)

        return rewriteAsExecute(ir, ctx, [value, ctx.zero(ir)])
    }

    const temp = ctx.allocate()
    ir.array.push(temp)

    return rewriteAsExecute(ir, ctx, [temp[Intrinsic.Set](ir, value, ctx), ctx.zero(ir)])
}
