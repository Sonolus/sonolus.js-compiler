export const Scroll = {
    LeftToRight: 0,
    TopToBottom: 1,
    RightToLeft: 2,
    BottomToTop: 3,
} as const

export type Scroll = (typeof Scroll)[keyof typeof Scroll]
