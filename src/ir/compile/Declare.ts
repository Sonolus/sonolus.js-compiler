import { iterateIR } from '../iterate/index.js'
import { Declare } from '../nodes/Declare.js'
import { CompileIR, compileIR } from './index.js'

export const compileDeclare: CompileIR<Declare> = (ir, ctx) => {
    for (const child of iterateIR(ir)) {
        compileIR(child, ctx)
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
