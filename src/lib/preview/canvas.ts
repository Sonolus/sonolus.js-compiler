import { VecLike } from '../shared/containers/Vec.js'
import { defineLib } from '../shared/define/lib.js'
import { HorizontalAlign } from '../shared/enums/HorizontalAlign.js'
import { PrintColor } from '../shared/enums/PrintColor.js'
import { PrintFormat } from '../shared/enums/PrintFormat.js'
import { native } from '../shared/native.js'
import { Scroll } from './enums/Scroll.js'
import { preprocessWritablePointer } from './utils/pointer.js'

type CanvasOptions = {
    scroll: Scroll
    size: number
}

type Canvas = CanvasOptions & {
    set(options: CanvasOptions): void
    print(options: {
        value: number
        format: PrintFormat
        decimalPlaces: 'auto' | number
        anchor: VecLike
        pivot: VecLike
        size: VecLike
        rotation: number
        color: PrintColor
        alpha: number
        horizontalAlign: HorizontalAlign
        background: boolean
    }): void
}

export const canvas = defineLib<Canvas>({
    scroll: preprocessWritablePointer(1001, 0, 0, 0),
    size: preprocessWritablePointer(1001, 1, 0, 0),

    set(this: Canvas, options: CanvasOptions) {
        ;({ scroll: this.scroll, size: this.size } = options)
    },
    print(options: {
        value: number
        format: PrintFormat
        decimalPlaces: 'auto' | number
        anchor: VecLike
        pivot: VecLike
        size: VecLike
        rotation: number
        color: PrintColor
        alpha: number
        horizontalAlign: HorizontalAlign
        background: boolean
    }) {
        native.Print(
            options.value,
            options.format,
            options.decimalPlaces === 'auto' ? -1 : options.decimalPlaces,
            options.anchor.x,
            options.anchor.y,
            options.pivot.x,
            options.pivot.y,
            options.size.x,
            options.size.y,
            options.rotation,
            options.color,
            options.alpha,
            options.horizontalAlign,
            options.background,
        )
    },
})
