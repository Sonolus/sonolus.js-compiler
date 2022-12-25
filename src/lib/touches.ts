import { Intrinsic } from '../intrinsic/index.js'
import { IR } from '../ir/nodes/index.js'
import { Vec } from './containers/Vec.js'
import { defineLib } from './define/lib.js'
import { createIterate } from './utils/iterate.js'
import { readonlyPointer } from './utils/pointer.js'

export type Touch = {
    readonly index: number
    readonly id: number
    readonly started: boolean
    readonly ended: boolean
    readonly t: number
    readonly st: number
    readonly x: number
    readonly y: number
    readonly sx: number
    readonly sy: number
    readonly dx: number
    readonly dy: number
    readonly vx: number
    readonly vy: number
    readonly vr: number
    readonly vw: number
    readonly time: number
    readonly startTime: number
    readonly position: Vec
    readonly startPosition: Vec
    readonly lastPosition: Vec
    readonly delta: Vec
    readonly velocity: Vec
}

type Touches = {
    readonly count: number

    get(index: number): Touch

    [Symbol.iterator](): Iterator<Touch>
}

const count = readonlyPointer(1001, 3, 0, 0)

export const touches = defineLib<Touches>({
    count,

    get: {
        [Intrinsic.Call]: (ir, _, [index], ctx) =>
            ctx.value(
                ir,
                createTouch(() => ctx.value(ir, index)),
            ),
    },

    [Intrinsic.Iterate]: (ir, _, estreeCtx, ctx) =>
        createIterate(
            ir,
            (index) =>
                ctx.Binary(ir.value, {
                    operator: '<',
                    lhs: index(),
                    rhs: ctx.value(ir.value, count),
                }),
            (index) => ctx.value(ir.value, createTouch(index)),
            estreeCtx,
            ctx,
        ),
})

const createTouch = (index: () => IR) =>
    defineLib<Touch>({
        index: {
            [Intrinsic.Get]: index,
        },
        id: readonlyPointer(1002, 0, index, 15),
        started: readonlyPointer(1002, 1, index, 15),
        ended: readonlyPointer(1002, 2, index, 15),
        t: readonlyPointer(1002, 3, index, 15),
        st: readonlyPointer(1002, 4, index, 15),
        x: readonlyPointer(1002, 5, index, 15),
        y: readonlyPointer(1002, 6, index, 15),
        sx: readonlyPointer(1002, 7, index, 15),
        sy: readonlyPointer(1002, 8, index, 15),
        dx: readonlyPointer(1002, 9, index, 15),
        dy: readonlyPointer(1002, 10, index, 15),
        vx: readonlyPointer(1002, 11, index, 15),
        vy: readonlyPointer(1002, 12, index, 15),
        vr: readonlyPointer(1002, 13, index, 15),
        vw: readonlyPointer(1002, 14, index, 15),
        get time() {
            return this.t
        },
        get startTime() {
            return this.st
        },
        get position() {
            return new Vec(this.x, this.y)
        },
        get startPosition() {
            return new Vec(this.sx, this.sy)
        },
        get lastPosition() {
            return this.position.sub(this.delta)
        },
        get delta() {
            return new Vec(this.dx, this.dy)
        },
        get velocity() {
            return new Vec(this.vx, this.vy)
        },
    })
