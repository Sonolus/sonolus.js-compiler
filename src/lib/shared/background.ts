import { Quad, QuadLike } from '../shared/containers/Quad.js'
import { defineLib } from '../shared/define/lib.js'

type Background = {
    x1: number
    y1: number
    x2: number
    y2: number
    x3: number
    y3: number
    x4: number
    y4: number
    readonly quad: Quad

    set(quad: QuadLike): void
}

export const createBackground = (pointer: <T>(x: number, y: number, s: number) => T): Background =>
    defineLib<Background>({
        x1: pointer(0, 0, 0),
        y1: pointer(1, 0, 0),
        x2: pointer(2, 0, 0),
        y2: pointer(3, 0, 0),
        x3: pointer(4, 0, 0),
        y3: pointer(5, 0, 0),
        x4: pointer(6, 0, 0),
        y4: pointer(7, 0, 0),
        get quad() {
            return new Quad(this)
        },

        set(quad: QuadLike) {
            ;({
                x1: this.x1,
                y1: this.y1,
                x2: this.x2,
                y2: this.y2,
                x3: this.x3,
                y3: this.y3,
                x4: this.x4,
                y4: this.y4,
            } = quad)
        },
    })
