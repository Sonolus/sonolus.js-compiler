import { ArrayDestructorRest } from '../../nodes/ArrayDestructorRest.js'
import { TransformIR } from './index.js'
import { rewriteAsExecute } from './utils.js'

export const transformArrayDestructorRest: TransformIR<ArrayDestructorRest> = (ir, ctx) => {
    const array: unknown[] = []

    const inits = ir.elements.map((element) =>
        ctx.ArrayAdd(ir, {
            array,
            value: ctx.value(ir, element),
        }),
    )

    ir.elements.length = 0

    return rewriteAsExecute(ir, ctx, [...inits, ctx.value(ir, array)])
}
