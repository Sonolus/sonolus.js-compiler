import { Container } from './Container.js'
import { Convertible } from './Convertible.js'
import { MatLike } from './Mat.js'
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

    private _apply(fn: (point: Vec) => Vec) {
        const { x: x1, y: y1 } = fn(this.p1)
        const { x: x2, y: y2 } = fn(this.p2)
        const { x: x3, y: y3 } = fn(this.p3)
        const { x: x4, y: y4 } = fn(this.p4)

        return new Quad(x1, y1, x2, y2, x3, y3, x4, y4)
    }
}
