export const HorizontalAlign = {
    Left: -1,
    Center: 0,
    Right: 1,
} as const

export type HorizontalAlign = (typeof HorizontalAlign)[keyof typeof HorizontalAlign]
