import { Member } from '../nodes/Member.js'
import { isConstant } from '../optimize/transform/utils.js'
import { CompileIR, compileIR } from './index.js'

export const compileMember: CompileIR<Member> = (ir, ctx) => {
    const objectResult = isConstant(ir.object)
    if (!objectResult) {
        compileIR(ir.object, ctx)

        throw ctx.error(ir.object, 'Target must be resolved at compile time')
    }

    const keyResult = isConstant(ir.key)
    if (!keyResult) {
        compileIR(ir.key, ctx)

        throw ctx.error(ir.key, 'Key must be resolved at compile time')
    }

    throw ctx.error(ir.key, 'Property does not exist')
}
