import { JSCall } from '../../nodes/JSCall.js'
import { TransformIR } from './index.js'
import { isConstant, transformIRAndGet } from './utils.js'

export const transformJSCall: TransformIR<JSCall> = (ir, ctx) => {
    const args = transformIRAndGet(ir.args, ctx)

    const result = isConstant(args)
    if (!result) return { ...ir, args }

    let ret: unknown
    try {
        ret = ir.func.call(ir.thisValue, ...(result.value as unknown[]))
    } catch (_) {
        return { ...ir, args }
    }

    return ctx.value(ir, ret)
}
