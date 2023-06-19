import { iterateIR } from '../iterate/index.js'
import { New } from '../nodes/New.js'
import { CompileIR, compileIR } from './index.js'

export const compileNew: CompileIR<New> = (ir, ctx) => {
    for (const child of iterateIR(ir)) {
        compileIR(child, ctx)
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
