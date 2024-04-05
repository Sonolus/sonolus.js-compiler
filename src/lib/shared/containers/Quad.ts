import { native } from '../native.js'
import { Container } from './Container.js'
import { Convertible } from './Convertible.js'
import { MatLike } from './Mat.js'
import { Rect } from './Rect.js'
import { Vec, VecLike } from './Vec.js'

export type QuadLike = {
    x1: number
    y1: number
    x2: number
    y2: number
    x3: number
    y3: number
    x4: number
    y4: number
}

export type QuadLikeConvertible = Convertible<QuadLike, 'toQuad'>

export class Quad extends Container<Quad>('x1', 'y1', 'x2', 'y2', 'x3', 'y3', 'x4', 'y4') {
    x1 = 0
    y1 = 0
    x2 = 0
    y2 = 0
    x3 = 0
    y3 = 0
    x4 = 0
    y4 = 0

    constructor(
        ...args:
            | []
            | [quad: QuadLike]
            | [quad: { p1: VecLike; p2: VecLike; p3: VecLike; p4: VecLike }]
            | [p1: VecLike, p2: VecLike, p3: VecLike, p4: VecLike]
            | [
                  x1: number,
                  y1: number,
                  x2: number,
                  y2: number,
                  x3: number,
                  y3: number,
                  x4: number,
                  y4: number,
              ]
    ) {
        super()

        if (args.length === 8) {
            ;[this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.x4, this.y4] = args
        } else if (args.length === 4) {
            ;({ x: this.x1, y: this.y1 } = args[0])
            ;({ x: this.x2, y: this.y2 } = args[1])
            ;({ x: this.x3, y: this.y3 } = args[2])
            ;({ x: this.x4, y: this.y4 } = args[3])
        } else if (args.length === 1) {
            if ('p1' in args[0]) {
                ;({ x: this.x1, y: this.y1 } = args[0].p1)
                ;({ x: this.x2, y: this.y2 } = args[0].p2)
                ;({ x: this.x3, y: this.y3 } = args[0].p3)
                ;({ x: this.x4, y: this.y4 } = args[0].p4)
            } else {
                ;({
                    x1: this.x1,
                    y1: this.y1,
                    x2: this.x2,
                    y2: this.y2,
                    x3: this.x3,
                    y3: this.y3,
                    x4: this.x4,
                    y4: this.y4,
                } = args[0])
            }
        }
    }

    get c(): Vec {
        return this.p1.add(this.p2).add(this.p3).add(this.p4).div(4)
    }

    get c12(): Vec {
        return this.p1.add(this.p2).div(2)
    }

    get c14(): Vec {
        return this.p1.add(this.p4).div(2)
    }

    get c34(): Vec {
        return this.p3.add(this.p4).div(2)
    }

    get c23(): Vec {
        return this.p2.add(this.p3).div(2)
    }

    get p1(): Vec {
        return new Vec(this.x1, this.y1)
    }

    get p2(): Vec {
        return new Vec(this.x2, this.y2)
    }

    get p3(): Vec {
        return new Vec(this.x3, this.y3)
    }

    get p4(): Vec {
        return new Vec(this.x4, this.y4)
    }

    get aabb(): Rect {
        return new Rect({
            l: Math.min(this.x1, this.x2, this.x3, this.x4),
            r: Math.max(this.x1, this.x2, this.x3, this.x4),
            b: Math.min(this.y1, this.y2, this.y3, this.y4),
            t: Math.max(this.y1, this.y2, this.y3, this.y4),
        })
    }

    add(vec: VecLike): Quad {
        return this._apply((point) => point.add(vec))
    }

    sub(vec: VecLike): Quad {
        return this._apply((point) => point.sub(vec))
    }

    mul(value: number): Quad {
        return this._apply((point) => point.mul(value))
    }

    div(value: number): Quad {
        return this._apply((point) => point.div(value))
    }

    translate(x: number, y: number): Quad {
        return this._apply((point) => point.translate(x, y))
    }

    scale(x: number, y: number): Quad {
        return this._apply((point) => point.scale(x, y))
    }

    rotate(value: number): Quad {
        return this._apply((point) => point.rotate(value))
    }

    transform(mat: MatLike): Quad {
        return this._apply((point) => point.transform(mat))
    }

    swapRotate90(): Quad {
        return new Quad({ p1: this.p2, p2: this.p3, p3: this.p4, p4: this.p1 })
    }

    swapRotate180(): Quad {
        return new Quad({ p1: this.p3, p2: this.p4, p3: this.p1, p4: this.p2 })
    }

    swapRotate270(): Quad {
        return new Quad({ p1: this.p4, p2: this.p1, p3: this.p2, p4: this.p3 })
    }

    swapMirrorY(): Quad {
        return new Quad({ p1: this.p4, p2: this.p3, p3: this.p2, p4: this.p1 })
    }

    swapMirrorX(): Quad {
        return new Quad({ p1: this.p2, p2: this.p1, p3: this.p4, p4: this.p3 })
    }

    private _apply(fn: (point: Vec) => Vec) {
        const { x: x1, y: y1 } = fn(this.p1)
        const { x: x2, y: y2 } = fn(this.p2)
        const { x: x3, y: y3 } = fn(this.p3)
        const { x: x4, y: y4 } = fn(this.p4)

        return new Quad(x1, y1, x2, y2, x3, y3, x4, y4)
    }

    static get zero(): Quad {
        return new Quad(0, 0, 0, 0, 0, 0, 0, 0)
    }

    static get one(): Quad {
        return new Quad(-1, -1, -1, 1, 1, 1, 1, -1)
    }

    static get l(): Quad {
        return new Quad(-1, -1, -1, 1, 0, 1, 0, -1)
    }

    static get b(): Quad {
        return new Quad(-1, -1, -1, 0, 1, 0, 1, -1)
    }

    static get r(): Quad {
        return new Quad(0, -1, 0, 1, 1, 1, 1, -1)
    }

    static get t(): Quad {
        return new Quad(-1, 0, -1, 1, 1, 1, 1, 0)
    }

    static get lb(): Quad {
        return new Quad(-1, -1, -1, 0, 0, 0, 0, -1)
    }

    static get rb(): Quad {
        return new Quad(0, -1, 0, 0, 1, 0, 1, -1)
    }

    static get lt(): Quad {
        return new Quad(-1, 0, -1, 1, 0, 1, 0, 0)
    }

    static get rt(): Quad {
        return new Quad(0, 0, 0, 1, 1, 1, 1, 0)
    }

    static lerp(x: QuadLike, y: QuadLike, s: number): Quad {
        return Quad._map(x, y, (x, y) => native.Lerp(x, y, s))
    }

    static lerpClamped(x: QuadLike, y: QuadLike, s: number): Quad {
        return Quad._map(x, y, (x, y) => native.LerpClamped(x, y, s))
    }

    static remap(a: number, b: number, c: QuadLike, d: QuadLike, s: number): Quad {
        return Quad._map(c, d, (c, d) => native.Remap(a, b, c, d, s))
    }

    static remapClamped(a: number, b: number, c: QuadLike, d: QuadLike, s: number): Quad {
        return Quad._map(c, d, (c, d) => native.RemapClamped(a, b, c, d, s))
    }

    private static _map(x: QuadLike, y: QuadLike, fn: (x: number, y: number) => number): Quad {
        return new Quad(
            fn(x.x1, y.x1),
            fn(x.y1, y.y1),
            fn(x.x2, y.x2),
            fn(x.y2, y.y2),
            fn(x.x3, y.x3),
            fn(x.y3, y.y3),
            fn(x.x4, y.x4),
            fn(x.y4, y.y4),
        )
    }
}
