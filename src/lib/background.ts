import { Quad, QuadLike } from './containers/Quad.js'
import { defineLib } from './define/lib.js'
import { singleThreadedWritablePointer } from './utils/pointer.js'

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

export const background = defineLib<Background>({
    x1: singleThreadedWritablePointer(1005, 0, 0, 0),
    y1: singleThreadedWritablePointer(1005, 1, 0, 0),
    x2: singleThreadedWritablePointer(1005, 2, 0, 0),
    y2: singleThreadedWritablePointer(1005, 3, 0, 0),
    x3: singleThreadedWritablePointer(1005, 4, 0, 0),
    y3: singleThreadedWritablePointer(1005, 5, 0, 0),
    x4: singleThreadedWritablePointer(1005, 6, 0, 0),
    y4: singleThreadedWritablePointer(1005, 7, 0, 0),
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
