import { New } from '../nodes/New.js'
import { isConstant } from '../optimize/transform/utils.js'
import { CompileIR, compileIR } from './index.js'

export const compileNew: CompileIR<New> = (ir, ctx) => {
    const calleeResult = isConstant(ir.callee)
    if (!calleeResult) {
        compileIR(ir.callee, ctx)

        throw ctx.error(ir.callee, 'Callee must be resolved at compile time')
    }

    const argsResult = isConstant(ir.args)
    if (!argsResult) {
        compileIR(ir.args, ctx)

        throw ctx.error(ir.args, 'New arguments must be resolved at compile time')
    }

    if (typeof calleeResult.value !== 'function')
        throw ctx.error(ir.callee, 'Callee is not a function')

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
