import { iterateIR } from '../iterate/index.js'
import { Member } from '../nodes/Member.js'
import { CompileIR, compileIR } from './index.js'

export const compileMember: CompileIR<Member> = (ir, ctx) => {
    for (const child of iterateIR(ir)) {
        compileIR(child, ctx)
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
