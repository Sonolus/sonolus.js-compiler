import { IR } from '../../../ir/nodes/index.js'
import { TransformIRContext } from '../../../ir/optimize/transform/context.js'
import { Pointer, pointer } from '../../utils/pointer.js'

export const createPointers = (
    ir: IR,
    buffer: Pointer,
    index: () => IR,
    offset: number,
    size: number,
    ctx: TransformIRContext,
): Pointer[] =>
    [...Array(size).keys()].map((i) =>
        pointer(
            buffer.id,
            () =>
                ctx.Binary(ir, {
                    operator: '+',
                    lhs: ctx.value(ir, i + offset),
                    rhs: ctx.Binary(ir, {
                        operator: '+',
                        lhs: typeof buffer.x === 'number' ? ctx.value(ir, buffer.x) : buffer.x(),
                        rhs: ctx.Binary(ir, {
                            operator: '*',
                            lhs: index(),
                            rhs: ctx.value(ir, size),
                        }),
                    }),
                }),
            buffer.y,
            buffer.s,
            buffer.writableCallbacks,
        ),
    )
