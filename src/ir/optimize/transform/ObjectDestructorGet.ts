import { ObjectDestructorGet } from '../../nodes/ObjectDestructorGet.js'
import { TransformIR } from './index.js'
import { isConstant, rewriteAsExecute, transformIRAndGet } from './utils.js'

export const transformObjectDestructorGet: TransformIR<ObjectDestructorGet> = (ir, ctx) => {
    const key = transformIRAndGet(ir.key, ctx)

    const result = isConstant(key)
    if (!result) return { ...ir, key }

    if (!ir.target.keys) return { ...ir, key }

    const index = ir.target.keys.indexOf(result.value as string)
    if (index !== -1) {
        ir.target.keys.splice(index, 1)
    }

    return rewriteAsExecute(ir, ctx, [
        key,
        ctx.Member(ir, {
            object: ctx.value(ir, ir.target.object),
            key: ctx.value(ir, result.value),
        }),
    ])
}
