import { ObjectDestructorRest } from '../../nodes/ObjectDestructorRest.js'
import { TransformIR } from './index.js'
import { rewriteAsExecute } from './utils.js'

export const transformObjectDestructorRest: TransformIR<ObjectDestructorRest> = (ir, ctx) => {
    const object = {}

    const inits = ir.target.keys.map((key) =>
        ctx.ObjectAdd(ir, {
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

    return rewriteAsExecute(ir, ctx, [...inits, ctx.value(ir, object)])
}
