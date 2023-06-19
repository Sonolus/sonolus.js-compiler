import { iterateIR } from '../iterate/index.js'
import { ArrayDestructorRest } from '../nodes/ArrayDestructorRest.js'
import { CompileIR, compileIR } from './index.js'

export const compileArrayDestructorRest: CompileIR<ArrayDestructorRest> = (ir, ctx) => {
    for (const child of iterateIR(ir)) {
        compileIR(child, ctx)
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
