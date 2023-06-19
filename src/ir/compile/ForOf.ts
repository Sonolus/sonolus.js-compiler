import { iterateIR } from '../iterate/index.js'
import { ForOf } from '../nodes/ForOf.js'
import { CompileIR, compileIR } from './index.js'

export const compileForOf: CompileIR<ForOf> = (ir, ctx) => {
    for (const child of iterateIR(ir)) {
        compileIR(child, ctx)
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
