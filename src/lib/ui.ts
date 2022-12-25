import { defineLib } from './define/lib.js'
import { HorizontalAlign } from './enums/HorizontalAlign.js'
import { preprocessWritablePointer } from './utils/pointer.js'

type UIOptions = {
    readonly anchor: {
        x: number
        y: number
    }
    readonly pivot: {
        x: number
        y: number
    }
    readonly size: {
        x: number
        y: number
    }
    rotation: number
    alpha: number
    horizontalAlign: HorizontalAlign
    background: boolean
}

export type UI = UIOptions & {
    set(options: UIOptions): void
}

export type UIConfiguration = {
    readonly scale: number
    readonly alpha: number
}

const uiPointer = (x: number, index: number) => preprocessWritablePointer(1006, x, index, 10)

const createUI = (index: number) =>
    defineLib<UI>({
        anchor: {
            x: uiPointer(0, index),
            y: uiPointer(1, index),
        },
        pivot: {
            x: uiPointer(2, index),
            y: uiPointer(3, index),
        },
        size: {
            x: uiPointer(4, index),
            y: uiPointer(5, index),
        },
        rotation: uiPointer(6, index),
        alpha: uiPointer(7, index),
        horizontalAlign: uiPointer(8, index),
        background: uiPointer(9, index),

        set(this: UI, options: UIOptions) {
            ;({ x: this.anchor.x, y: this.anchor.y } = options.anchor)
            ;({ x: this.pivot.x, y: this.pivot.y } = options.pivot)
            ;({ x: this.size.x, y: this.size.y } = options.size)
            ;({
                rotation: this.rotation,
                alpha: this.alpha,
                horizontalAlign: this.horizontalAlign,
                background: this.background,
            } = options)
        },
    })

const configurationPointer = (x: number, index: number) =>
    preprocessWritablePointer(1007, x, index, 2)

const createUIConfiguration = (index: number) =>
    defineLib<UIConfiguration>({
        scale: configurationPointer(0, index),
        alpha: configurationPointer(1, index),
    })

export const ui = {
    menu: createUI(0),
    judgment: createUI(1),
    combo: {
        value: createUI(2),
        text: createUI(3),
    },
    metric: {
        primary: {
            bar: createUI(4),
            value: createUI(5),
        },
        secondary: {
            bar: createUI(6),
            value: createUI(7),
        },
    },

    configuration: {
        menu: createUIConfiguration(0),
        judgment: createUIConfiguration(1),
        combo: createUIConfiguration(2),
        metric: {
            primary: createUIConfiguration(3),
            secondary: createUIConfiguration(4),
        },
    },
} as const
