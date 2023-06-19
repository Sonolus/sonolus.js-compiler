import { Call } from '../nodes/Call.js'
import { isConstant } from '../optimize/transform/utils.js'
import { CompileIR, compileIR } from './index.js'

export const compileCall: CompileIR<Call> = (ir, ctx) => {
    const calleeResult = isConstant(ir.callee)
    if (!calleeResult) {
        compileIR(ir.callee, ctx)

        throw ctx.error(ir.callee, 'Callee must be resolved at compile time')
    }

    const argsResult = isConstant(ir.args)
    if (!argsResult) {
        compileIR(ir.args, ctx)

        throw ctx.error(ir.args, 'Call arguments must be resolved at compile time')
    }

    if (typeof calleeResult.value !== 'function')
        throw ctx.error(ir.callee, 'Callee is not a function')

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
