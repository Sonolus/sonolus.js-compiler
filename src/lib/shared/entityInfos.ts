import { Intrinsic } from '../../intrinsic/index.js'
import { IR } from '../../ir/nodes/index.js'
import { defineLib } from './define/lib.js'
import { createIterate } from './utils/iterate.js'

type EntityInfos<T> = {
    get(index: number): T

    [Symbol.iterator](): Iterator<T>
}

export const createEntityInfos = <T>(
    entityInfoIndexPointer: (index: () => IR) => unknown,
    createEntityInfo: (index: () => IR) => T,
): EntityInfos<T> =>
    defineLib<EntityInfos<T>>({
        get: {
            [Intrinsic.Call]: (ir, _, [index], ctx) =>
                ctx.value(
                    ir,
                    createEntityInfo(() => ctx.value(ir, index)),
                ),
        },

        [Intrinsic.Iterate]: (ir, _, estreeCtx, ctx) =>
            createIterate(
                ir,
                (index) =>
                    ctx.Binary(ir.value, {
                        operator: '===',
                        lhs: index(),
                        rhs: ctx.value(ir.value, entityInfoIndexPointer(index)),
                    }),
                (index) => ctx.value(ir.value, createEntityInfo(index)),
                estreeCtx,
                ctx,
            ),
    })
