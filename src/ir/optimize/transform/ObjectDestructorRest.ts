import { ObjectDestructorRest } from '../../nodes/ObjectDestructorRest.js'
import { TransformIR } from './index.js'

export const transformObjectDestructorRest: TransformIR<ObjectDestructorRest> = (ir, ctx) => {
    const object = {}
    const children = ir.target.keys.map((key) =>
        ctx.ObjectConstructorAdd(ir, {
            object,
            kind: 'init',
            key: ctx.value(ir, key),
            value: ctx.Member(ir, {
                object: ctx.value(ir, ir.target.object),
                key: ctx.value(ir, key),
            }),
        }),
    )

    ir.target.keys = []

    return ctx.ObjectConstructor(ir, {
        object,
        children,
    })
}
