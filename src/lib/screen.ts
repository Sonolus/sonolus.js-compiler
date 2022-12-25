import { Rect } from './containers/Rect.js'
import { defineLib } from './define/lib.js'
import { preprocessWritablePointer } from './utils/pointer.js'

type Screen = {
    readonly l: number
    readonly b: number
    readonly r: number
    readonly t: number
    readonly w: number
    readonly h: number
    readonly aspectRatio: number
    readonly rect: Rect
}

export const screen = defineLib<Screen>({
    get l() {
        return -this.aspectRatio
    },
    b: -1,
    get r() {
        return this.aspectRatio
    },
    t: 1,
    get w() {
        return this.aspectRatio * 2
    },
    h: 2,
    aspectRatio: preprocessWritablePointer(1000, 1, 0, 0),
    get rect() {
        return new Rect(this)
    },
})
