import { Rect } from '../shared/containers/Rect.js'
import { defineLib } from '../shared/define/lib.js'
import { Pointer } from './utils/pointer.js'

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

export const createScreen = (aspectRatio: Pointer): Screen =>
    defineLib<Screen>({
        get l() {
            return -(this.aspectRatio as number)
        },
        b: -1,
        get r() {
            return this.aspectRatio as number
        },
        t: 1,
        get w() {
            return this.aspectRatio * 2
        },
        h: 2,
        aspectRatio,
        get rect() {
            return new Rect(this)
        },
    })
