import { JSCall } from '../nodes/JSCall.js'
import { isConstant } from '../optimize/transform/utils.js'
import { CompileIR, compileIR } from './index.js'

export const compileJSCall: CompileIR<JSCall> = (ir, ctx) => {
    for (const arg of ir.args) {
        const result = isConstant(arg)
        if (!result) {
            compileIR(arg, ctx)

            throw ctx.error(arg, 'Call argument must be resolved at compile time')
        }
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
