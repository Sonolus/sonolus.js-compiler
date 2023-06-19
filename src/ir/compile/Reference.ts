import { iterateIR } from '../iterate/index.js'
import { Reference } from '../nodes/Reference.js'
import { CompileIR, compileIR } from './index.js'

export const compileReference: CompileIR<Reference> = (ir, ctx) => {
    for (const child of iterateIR(ir)) {
        compileIR(child, ctx)
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
