import { Rect } from '../shared/containers/Rect.js'
import { defineLib } from '../shared/define/lib.js'
import { Pointer } from './utils/pointer.js'

type SafeArea = {
    readonly l: number
    readonly b: number
    readonly r: number
    readonly t: number
    readonly w: number
    readonly h: number
    readonly aspectRatio: number
    readonly rect: Rect
}

export const createSafeArea = (
    xMin: Pointer,
    xMax: Pointer,
    yMin: Pointer,
    yMax: Pointer,
): SafeArea =>
    defineLib<SafeArea>({
        l: xMin,
        b: yMin,
        r: xMax,
        t: yMax,
        get w() {
            return this.r - this.l
        },
        get h() {
            return this.t - this.b
        },
        get aspectRatio() {
            return this.w / this.h
        },
        get rect() {
            return new Rect(this)
        },
    })
