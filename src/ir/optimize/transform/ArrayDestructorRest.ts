import { ArrayDestructorRest } from '../../nodes/ArrayDestructorRest.js'
import { TransformIR } from './index.js'

export const transformArrayDestructorRest: TransformIR<ArrayDestructorRest> = (ir, ctx) => {
    const array: unknown[] = []
    const children = ir.elements.map((element) =>
        ctx.ArrayConstructorAdd(ir, {
            array,
            value: ctx.value(ir, element),
        }),
    )

    ir.elements.length = 0

    return ctx.ArrayConstructor(ir, {
        array,
        children,
    })
}
