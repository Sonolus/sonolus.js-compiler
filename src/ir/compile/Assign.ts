import { iterateIR } from '../iterate/index.js'
import { Assign } from '../nodes/Assign.js'
import { CompileIR, compileIR } from './index.js'

export const compileAssign: CompileIR<Assign> = (ir, ctx) => {
    for (const child of iterateIR(ir)) {
        compileIR(child, ctx)
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
