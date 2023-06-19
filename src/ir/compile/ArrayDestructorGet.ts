import { ArrayDestructorGet } from '../nodes/ArrayDestructorGet.js'
import { CompileIR } from './index.js'

export const compileArrayDestructorGet: CompileIR<ArrayDestructorGet> = (ir, ctx) => {
    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
