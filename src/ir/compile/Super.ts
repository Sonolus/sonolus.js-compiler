import { iterateIR } from '../iterate/index.js'
import { Super } from '../nodes/Super.js'
import { CompileIR, compileIR } from './index.js'

export const compileSuper: CompileIR<Super> = (ir, ctx) => {
    for (const child of iterateIR(ir)) {
        compileIR(child, ctx)
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
