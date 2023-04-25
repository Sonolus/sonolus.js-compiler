import { JSCall } from '../../nodes/JSCall.js'
import { Value } from '../../nodes/Value.js'
import { TransformIR } from './index.js'
import { isConstant, transformIRAndGet } from './utils.js'

export const transformJSCall: TransformIR<JSCall> = (ir, ctx) => {
    const args = ir.args.map((arg) => transformIRAndGet(arg, ctx))

    const results = args.map(isConstant)
    if (!results.every((result): result is Value => !!result)) return { ...ir, args }

    let result: unknown
    try {
        result = ir.func.call(ir.thisValue, ...results.map((result) => result.value))
    } catch (_) {
        return { ...ir, args }
    }

    return ctx.value(ir, result)
}
