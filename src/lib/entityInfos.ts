import { Intrinsic } from '../intrinsic/index.js'
import { IR } from '../ir/nodes/index.js'
import { defineLib } from './define/lib.js'
import { EntityState } from './enums/EntityState.js'
import { createIterate } from './utils/iterate.js'
import { readonlyPointer } from './utils/pointer.js'

export type EntityInfo = {
    readonly index: number
    readonly archetype: number
    readonly state: EntityState
}

type EntityInfos = {
    get(index: number): EntityInfo

    [Symbol.iterator](): Iterator<EntityInfo>
}

export const entityInfos = defineLib<EntityInfos>({
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
                    rhs: ctx.value(ir.value, entityInfoPointer(0, index)),
                }),
            (index) => ctx.value(ir.value, createEntityInfo(index)),
            estreeCtx,
            ctx,
        ),
})

const createEntityInfo = (index: () => IR) => ({
    index: entityInfoPointer(0, index),
    archetype: entityInfoPointer(1, index),
    state: entityInfoPointer(2, index),
})

const entityInfoPointer = (x: number, index: () => IR) => readonlyPointer(4103, x, index, 3)
