import { ArrayDestructorRest } from '../nodes/ArrayDestructorRest.js'
import { CompileIR } from './index.js'

export const compileArrayDestructorRest: CompileIR<ArrayDestructorRest> = (ir, ctx) => {
    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
