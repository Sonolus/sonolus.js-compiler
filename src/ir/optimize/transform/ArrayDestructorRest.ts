import { ArrayDestructorRest } from '../../nodes/ArrayDestructorRest.js'
import { TransformIR } from './index.js'

export const transformArrayDestructorRest: TransformIR<ArrayDestructorRest> = (ir, ctx) => {
    if (!ir.target.elements) return ir

    const array: unknown[] = []
    const children = ir.target.elements.map((element) =>
        ctx.ArrayConstructorAdd(ir, {
            array,
            value: ctx.value(ir, element),
        }),
    )

    ir.target.elements.length = 0

    return ctx.ArrayConstructor(ir, {
        array,
        children,
    })
}
