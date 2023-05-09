import { Super } from '../../nodes/Super.js'
import { TransformIR } from './index.js'
import { isResolved, rewriteAsExecute, transformIRAndGet } from './utils.js'
import { callClassConstructor, initializeClassFields } from './utils/class.js'

export const transformSuper: TransformIR<Super> = (ir, ctx) => {
    const init = transformIRAndGet(ir.args.init, ctx)
    const args = {
        init: transformIRAndGet(ir.args.init, ctx),
        value: ir.args.value,
    }

    if (!isResolved(args.init)) return { ...ir, args }

    return rewriteAsExecute(ir, ctx, [
        init,
        ctx.ObjectConstructor(ir, {
            object: ir.instance,
            children: [
                ...callClassConstructor(
                    ir,
                    ir.instance,
                    Object.getPrototypeOf(ir.prototype),
                    args.value,
                    ctx,
                ),
                ...initializeClassFields(ir, ir.instance, ir.prototype as Function, ctx),
            ],
        }),
    ])
}
