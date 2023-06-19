import { Super } from '../nodes/Super.js'
import { isConstant } from '../optimize/transform/utils.js'
import { CompileIR, compileIR } from './index.js'

export const compileSuper: CompileIR<Super> = (ir, ctx) => {
    const result = isConstant(ir.args)
    if (!result) {
        compileIR(ir.args, ctx)

        throw ctx.error(ir.args, 'Arguments must be resolved at compile time')
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
