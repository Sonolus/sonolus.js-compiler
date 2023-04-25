import { Super } from '../../nodes/Super.js'
import { TransformIR } from './index.js'
import { rewriteAsExecute, transformIRAndGet } from './utils.js'
import { callClassConstructor, initializeClassFields } from './utils/class.js'

export const transformSuper: TransformIR<Super> = (ir, ctx) => {
    const init = transformIRAndGet(ir.args.init, ctx)
    const newIR = { ...ir, args: { init, value: ir.args.value } }

    return rewriteAsExecute(newIR, ctx, [
        init,
        ...callClassConstructor(
            newIR,
            newIR.instance,
            Object.getPrototypeOf(newIR.prototype),
            newIR.args.value,
            ctx,
        ),
        ...initializeClassFields(newIR, newIR.instance, newIR.prototype as Function, ctx),
        ctx.value(newIR, newIR.instance),
    ])
}
