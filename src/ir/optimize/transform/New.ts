import { mapIR } from '../../map/index.js'
import { New } from '../../nodes/New.js'
import { transformIR, TransformIR } from './index.js'
import { isConstant, rewriteAsExecute, transformIRAndGet } from './utils.js'
import { callClassConstructor } from './utils/class.js'

export const transformNew: TransformIR<New> = (ir, ctx) => {
    const callee = transformIR(ir.callee, ctx)
    const init = transformIRAndGet(ir.args.init, ctx)
    const newIR = mapIR(ir, callee, init)

    const result = isConstant(callee)
    if (!result) return newIR

    if (typeof result.value !== 'function') return newIR

    const prototype = result.value.prototype
    const instance = Object.create(prototype)

    return rewriteAsExecute(newIR, ctx, [
        callee,
        init,
        ...callClassConstructor(newIR, instance, prototype, newIR.args.value, ctx),
        ctx.value(newIR, instance),
    ])
}
