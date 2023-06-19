import { Declare } from '../nodes/Declare.js'
import { CompileIR, compileIR } from './index.js'

export const compileDeclare: CompileIR<Declare> = (ir, ctx) => {
    compileIR(ir.value, ctx)

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
