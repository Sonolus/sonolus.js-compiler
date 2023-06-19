import { iterateIR } from '../iterate/index.js'
import { ArrayDestructor } from '../nodes/ArrayDestructor.js'
import { CompileIR, compileIR } from './index.js'

export const compileArrayDestructor: CompileIR<ArrayDestructor> = (ir, ctx) => {
    for (const child of iterateIR(ir)) {
        compileIR(child, ctx)
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
