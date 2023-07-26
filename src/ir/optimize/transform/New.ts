import { New } from '../../nodes/New.js'
import { transformIR, TransformIR } from './index.js'
import { isConstant, rewriteAsExecute, transformIRAndGet } from './utils.js'
import { callClassConstructor } from './utils/class.js'

export const transformNew: TransformIR<New> = (ir, ctx) => {
    const callee = transformIR(ir.callee, ctx)
    const args = transformIRAndGet(ir.args, ctx)

    const calleeResult = isConstant(callee)
    if (!calleeResult) return { ...ir, callee, args }

    const argsResult = isConstant(args)
    if (!argsResult) return { ...ir, callee, args }

    if (typeof calleeResult.value !== 'function') return { ...ir, callee, args }

    const prototype = calleeResult.value.prototype as Function
    const instance = Object.create(prototype) as object

    return rewriteAsExecute(ir, ctx, [
        callee,
        args,
        ctx.ObjectConstructor(ir, {
            object: instance,
            children: callClassConstructor(
                ir,
                instance,
                prototype,
                argsResult.value as unknown[],
                ctx,
            ),
        }),
    ])
}
