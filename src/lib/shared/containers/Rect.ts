import { native } from '../native.js'
import { Container } from './Container.js'
import { MatLike } from './Mat.js'
import { Quad } from './Quad.js'
import { Vec, VecLike } from './Vec.js'

export type RectLike = {
    l: number
    b: number
    r: number
    t: number
}

export class Rect extends Container<Rect>('l', 'b', 'r', 't') {
    l = 0
    b = 0
    r = 0
    t = 0

    constructor(...args: [] | [rect: RectLike] | [l: number, b: number, r: number, t: number]) {
        super()

        if (args.length === 4) {
            ;[this.l, this.b, this.r, this.t] = args
        } else if (args.length === 1) {
            ;({ l: this.l, b: this.b, r: this.r, t: this.t } = args[0])
        }
    }

    get w(): number {
        return this.r - this.l
    }

    get h(): number {
        return this.t - this.b
    }

    get aspectRatio(): number {
        return this.w / this.h
    }

    get c(): Vec {
        return new Vec((this.l + this.r) / 2, (this.b + this.t) / 2)
    }

    get cl(): Vec {
        return new Vec(this.l, (this.b + this.t) / 2)
    }

    get cb(): Vec {
        return new Vec((this.l + this.r) / 2, this.b)
    }

    get cr(): Vec {
        return new Vec(this.r, (this.b + this.t) / 2)
    }

    get ct(): Vec {
        return new Vec((this.l + this.r) / 2, this.t)
    }

    get lb(): Vec {
        return new Vec(this.l, this.b)
    }

    get rb(): Vec {
        return new Vec(this.r, this.b)
    }

    get lt(): Vec {
        return new Vec(this.l, this.t)
    }

    get rt(): Vec {
        return new Vec(this.r, this.t)
    }

    add(vec: VecLike): Rect {
        return this._apply((point) => point.add(vec))
    }

    sub(vec: VecLike): Rect {
        return this._apply((point) => point.sub(vec))
    }

    mul(value: number): Rect {
        return this._apply((point) => point.mul(value))
    }

    div(value: number): Rect {
        return this._apply((point) => point.div(value))
    }

    translate(x: number, y: number): Rect {
        return this._apply((point) => point.translate(x, y))
    }

    scale(x: number, y: number): Rect {
        return this._apply((point) => point.scale(x, y))
    }

    rotate(angle: number): Rect {
        return this._apply((point) => point.rotate(angle))
    }

    transform(mat: MatLike): Rect {
        return this._apply((point) => point.transform(mat))
    }

    expand(x: number, y: number): Rect {
        return new Rect(this.l - x, this.b - y, this.r + x, this.t + y)
    }

    shrink(x: number, y: number): Rect {
        return new Rect(this.l + x, this.b + y, this.r - x, this.t - y)
    }

    contains(vec: VecLike): boolean {
        return vec.x > this.l && vec.x < this.r && vec.y > this.b && vec.y < this.t
    }

    overlaps(rect: RectLike): boolean {
        return rect.b < this.t && rect.t > this.b && rect.l < this.r && rect.r > this.l
    }

    toQuad(): Quad {
        return new Quad(this.l, this.b, this.l, this.t, this.r, this.t, this.r, this.b)
    }

    private _apply(fn: (point: Vec) => Vec) {
        const { x: l, y: b } = fn(this.lb)
        const { x: r, y: t } = fn(this.rt)

        return new Rect(l, b, r, t)
    }

    static get zero(): Rect {
        return new Rect(0, 0, 0, 0)
    }

    static get one(): Rect {
        return new Rect(-1, -1, 1, 1)
    }

    static get l(): Rect {
        return new Rect(-1, -1, 0, 1)
    }

    static get b(): Rect {
        return new Rect(-1, -1, 1, 0)
    }

    static get r(): Rect {
        return new Rect(0, -1, 1, 1)
    }

    static get t(): Rect {
        return new Rect(-1, 0, 1, 1)
    }

    static get lb(): Rect {
        return new Rect(-1, -1, 0, 0)
    }

    static get rb(): Rect {
        return new Rect(0, -1, 1, 0)
    }

    static get lt(): Rect {
        return new Rect(-1, 0, 0, 1)
    }

    static get rt(): Rect {
        return new Rect(0, 0, 1, 1)
    }

    static lerp(x: RectLike, y: RectLike, s: number): Rect {
        return Rect._map(x, y, (x, y) => native.Lerp(x, y, s))
    }

    static lerpClamped(x: RectLike, y: RectLike, s: number): Rect {
        return Rect._map(x, y, (x, y) => native.LerpClamped(x, y, s))
    }

    static remap(a: number, b: number, c: RectLike, d: RectLike, s: number): Rect {
        return Rect._map(c, d, (c, d) => native.Remap(a, b, c, d, s))
    }

    static remapClamped(a: number, b: number, c: RectLike, d: RectLike, s: number): Rect {
        return Rect._map(c, d, (c, d) => native.RemapClamped(a, b, c, d, s))
    }

    private static _map(x: RectLike, y: RectLike, fn: (x: number, y: number) => number): Rect {
        return new Rect(fn(x.l, y.l), fn(x.b, y.b), fn(x.r, y.r), fn(x.t, y.t))
    }
}
