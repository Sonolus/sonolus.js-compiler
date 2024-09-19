import { native } from '../native.js'
import { Container } from './Container.js'

export type RangeLike = {
    min: number
    max: number
}

export class Range extends Container<Range>('min', 'max') {
    min = 0
    max = 0

    constructor(...args: [] | [range: RangeLike] | [x: number, y: number]) {
        super()

        if (args.length === 2) {
            ;[this.min, this.max] = args
        } else if (args.length === 1) {
            ;({ min: this.min, max: this.max } = args[0])
        }
    }

    get length(): number {
        return this.max - this.min
    }

    mirror(): Range {
        return new Range(-this.max, -this.min)
    }

    add(value: number): Range {
        return new Range(this.min + value, this.max + value)
    }

    sub(value: number): Range {
        return new Range(this.min - value, this.max - value)
    }

    mul(value: number): Range {
        return new Range(this.min * value, this.max * value)
    }

    div(value: number): Range {
        return new Range(this.min / value, this.max / value)
    }

    translate(value: number): Range {
        return new Range(this.min + value, this.max + value)
    }

    scale(value: number): Range {
        return new Range(this.min * value, this.max * value)
    }

    expand(value: number): Range {
        return new Range(this.min - value, this.max + value)
    }

    shrink(value: number): Range {
        return new Range(this.min + value, this.max - value)
    }

    contains(value: number): boolean {
        return value >= this.min && value <= this.max
    }

    static get zero(): Range {
        return new Range(0, 0)
    }

    static get one(): Range {
        return new Range(1, 1)
    }

    static get l(): Range {
        return new Range(-1, 0)
    }

    static get r(): Range {
        return new Range(0, 1)
    }

    static lerp(x: RangeLike, y: RangeLike, s: number): Range {
        return Range._map(x, y, (x, y) => native.Lerp(x, y, s))
    }

    static lerpClamped(x: RangeLike, y: RangeLike, s: number): Range {
        return Range._map(x, y, (x, y) => native.LerpClamped(x, y, s))
    }

    static remap(a: number, b: number, c: RangeLike, d: RangeLike, s: number): Range {
        return Range._map(c, d, (c, d) => native.Remap(a, b, c, d, s))
    }

    static remapClamped(a: number, b: number, c: RangeLike, d: RangeLike, s: number): Range {
        return Range._map(c, d, (c, d) => native.RemapClamped(a, b, c, d, s))
    }

    private static _map(x: RangeLike, y: RangeLike, fn: (x: number, y: number) => number): Range {
        return new Range(fn(x.min, y.min), fn(x.max, y.max))
    }
}
