import { iterateIR } from '../iterate/index.js'
import { ArrayDestructorGet } from '../nodes/ArrayDestructorGet.js'
import { CompileIR, compileIR } from './index.js'

export const compileArrayDestructorGet: CompileIR<ArrayDestructorGet> = (ir, ctx) => {
    for (const child of iterateIR(ir)) {
        compileIR(child, ctx)
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
