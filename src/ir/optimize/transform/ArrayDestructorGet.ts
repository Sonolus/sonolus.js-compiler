import { ArrayDestructorGet } from '../../nodes/ArrayDestructorGet.js'
import { TransformIR } from './index.js'

export const transformArrayDestructorGet: TransformIR<ArrayDestructorGet> = (ir, ctx) =>
    ctx.value(ir, ir.elements.shift())
