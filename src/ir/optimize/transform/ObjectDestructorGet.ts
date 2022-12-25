import { mapIR } from '../../map/index.js'
import { ObjectDestructorGet } from '../../nodes/ObjectDestructorGet.js'
import { TransformIR } from './index.js'
import { isConstant, rewriteAsExecute, transformIRAndGet } from './utils.js'

export const transformObjectDestructorGet: TransformIR<ObjectDestructorGet> = (ir, ctx) => {
    const key = transformIRAndGet(ir.key, ctx)
    const newIR = mapIR(ir, key)

    const result = isConstant(key)
    if (!result) return newIR

    const index = newIR.target.keys.indexOf(result.value as never)
    if (index !== -1) {
        newIR.target.keys.splice(index, 1)
    }

    return rewriteAsExecute(newIR, ctx, [
        key,
        ctx.Member(newIR, {
            object: ctx.value(newIR, newIR.target.object),
            key: ctx.value(newIR, result.value),
        }),
    ])
}
