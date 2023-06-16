import { ArrayDestructorGet } from '../../nodes/ArrayDestructorGet.js'
import { TransformIR } from './index.js'

export const transformArrayDestructorGet: TransformIR<ArrayDestructorGet> = (ir, ctx) => {
    if (!ir.target.elements) return ir

    return ctx.value(ir, ir.target.elements.shift())
}
