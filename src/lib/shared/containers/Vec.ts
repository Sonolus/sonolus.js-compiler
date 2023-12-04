import { native } from '../native.js'
import { Container } from './Container.js'
import { MatLike } from './Mat.js'

export type VecLike = {
    x: number
    y: number
}

export class Vec extends Container<Vec>('x', 'y') {
    x = 0
    y = 0

    constructor(...args: [] | [vec: VecLike] | [x: number, y: number]) {
        super()

        if (args.length === 2) {
            ;[this.x, this.y] = args
        } else if (args.length === 1) {
            ;({ x: this.x, y: this.y } = args[0])
        }
    }

    get length(): number {
        return (this.x ** 2 + this.y ** 2) ** 0.5
    }

    add(vec: VecLike): Vec {
        return new Vec(this.x + vec.x, this.y + vec.y)
    }

    sub(vec: VecLike): Vec {
        return new Vec(this.x - vec.x, this.y - vec.y)
    }

    mul(value: number): Vec {
        return new Vec(this.x * value, this.y * value)
    }

    div(value: number): Vec {
        return new Vec(this.x / value, this.y / value)
    }

    translate(x: number, y: number): Vec {
        return new Vec(this.x + x, this.y + y)
    }

    scale(x: number, y: number): Vec {
        return new Vec(this.x * x, this.y * y)
    }

    rotate(angle: number): Vec {
        return new Vec(
            Math.cos(angle) * this.x - Math.sin(angle) * this.y,
            Math.sin(angle) * this.x + Math.cos(angle) * this.y,
        )
    }

    transform(mat: MatLike): Vec {
        return new Vec(
            this.x * mat.m00 + this.y * mat.m01 + mat.m03,
            this.x * mat.m10 + this.y * mat.m11 + mat.m13,
        )
    }

    static get zero(): Vec {
        return new Vec(0, 0)
    }

    static get one(): Vec {
        return new Vec(1, 1)
    }

    static get l(): Vec {
        return new Vec(-1, 0)
    }

    static get r(): Vec {
        return new Vec(1, 0)
    }

    static get b(): Vec {
        return new Vec(0, -1)
    }

    static get t(): Vec {
        return new Vec(0, 1)
    }

    static get lb(): Vec {
        return new Vec(-1, -1)
    }

    static get rb(): Vec {
        return new Vec(1, -1)
    }

    static get lt(): Vec {
        return new Vec(-1, 1)
    }

    static get rt(): Vec {
        return new Vec(1, 1)
    }

    static lerp(x: VecLike, y: VecLike, s: number): Vec {
        return Vec._map(x, y, (x, y) => native.Lerp(x, y, s))
    }

    static lerpClamped(x: VecLike, y: VecLike, s: number): Vec {
        return Vec._map(x, y, (x, y) => native.LerpClamped(x, y, s))
    }

    static remap(a: number, b: number, c: VecLike, d: VecLike, s: number): Vec {
        return Vec._map(c, d, (c, d) => native.Remap(a, b, c, d, s))
    }

    static remapClamped(a: number, b: number, c: VecLike, d: VecLike, s: number): Vec {
        return Vec._map(c, d, (c, d) => native.RemapClamped(a, b, c, d, s))
    }

    private static _map(x: VecLike, y: VecLike, fn: (x: number, y: number) => number): Vec {
        return new Vec(fn(x.x, y.x), fn(x.y, y.y))
    }
}
