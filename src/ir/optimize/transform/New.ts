import { New } from '../../nodes/New.js'
import { transformIR, TransformIR } from './index.js'
import { isConstant, rewriteAsExecute, transformIRAndGet } from './utils.js'
import { callClassConstructor } from './utils/class.js'

export const transformNew: TransformIR<New> = (ir, ctx) => {
    const callee = transformIR(ir.callee, ctx)
    const args = {
        init: transformIRAndGet(ir.args.init, ctx),
        value: ir.args.value,
    }

    const result = isConstant(callee)
    if (!result) return { ...ir, callee, args }

    if (typeof result.value !== 'function') return { ...ir, callee, args }

    const prototype = result.value.prototype
    const instance = Object.create(prototype)

    return rewriteAsExecute(ir, ctx, [
        callee,
        args.init,
        ...callClassConstructor(ir, instance, prototype, args.value, ctx),
        ctx.value(ir, instance),
    ])
}
