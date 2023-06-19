import { hasIntrinsicGet, hasIntrinsicSet } from '../../intrinsic/has.js'
import { Assign } from '../nodes/Assign.js'
import { isConstant } from '../optimize/transform/utils.js'
import { CompileIR, compileIR } from './index.js'

export const compileAssign: CompileIR<Assign> = (ir, ctx) => {
    const result = isConstant(ir.lhs)
    if (!result) {
        compileIR(ir.lhs, ctx)

        throw ctx.error(ir.lhs, 'Assignment target must be resolved at compile time')
    }

    if (!hasIntrinsicSet(result)) throw ctx.error(ir.lhs, 'Assignment target must be mutable')

    if (!hasIntrinsicGet(result)) throw ctx.error(ir.lhs, 'Assignment target must be readable')

    compileIR(ir.rhs, ctx)

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
