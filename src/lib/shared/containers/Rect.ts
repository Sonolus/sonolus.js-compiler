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
}
