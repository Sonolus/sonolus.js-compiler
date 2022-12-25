import { mapIR } from '../../map/index.js'
import { JSCall } from '../../nodes/JSCall.js'
import { Value } from '../../nodes/Value.js'
import { TransformIR } from './index.js'
import { isConstant, transformIRAndGet } from './utils.js'

export const transformJSCall: TransformIR<JSCall> = (ir, ctx) => {
    const args = ir.args.map((arg) => transformIRAndGet(arg, ctx))
    const newIR = mapIR(ir, ...args)

    const results = args.map(isConstant)
    if (!results.every((result): result is Value => !!result)) return newIR

    let result: unknown
    try {
        result = newIR.func.call(newIR.thisValue, ...results.map((result) => result.value))
    } catch (_) {
        return newIR
    }

    return ctx.value(ir, result)
}
