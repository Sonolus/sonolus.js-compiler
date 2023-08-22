import { defineLib } from '../shared/define/lib.js'
import { Scroll } from './enums/Scroll.js'
import { preprocessWritablePointer } from './utils/pointer.js'

type CanvasOptions = {
    scroll: Scroll
    size: number
}

type Canvas = CanvasOptions & {
    set(options: CanvasOptions): void
}

export const canvas = defineLib<Canvas>({
    scroll: preprocessWritablePointer(1001, 0, 0, 0),
    size: preprocessWritablePointer(1001, 1, 0, 0),

    set(this: Canvas, options: CanvasOptions) {
        ;({ scroll: this.scroll, size: this.size } = options)
    },
})
