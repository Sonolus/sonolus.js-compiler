import { Super } from '../../nodes/Super.js'
import { TransformIR } from './index.js'
import { isConstant, rewriteAsExecute, transformIRAndGet } from './utils.js'
import { callClassConstructor, initializeClassFields } from './utils/class.js'

export const transformSuper: TransformIR<Super> = (ir, ctx) => {
    const args = transformIRAndGet(ir.args, ctx)

    const result = isConstant(args)
    if (!result) return { ...ir, args }

    return rewriteAsExecute(ir, ctx, [
        args,
        ctx.ObjectConstructor(ir, {
            object: ir.instance,
            children: [
                ...callClassConstructor(
                    ir,
                    ir.instance,
                    Object.getPrototypeOf(ir.prototype),
                    result.value as unknown[],
                    ctx,
                ),
                ...initializeClassFields(ir, ir.instance, ir.prototype as Function, ctx),
            ],
        }),
    ])
}
