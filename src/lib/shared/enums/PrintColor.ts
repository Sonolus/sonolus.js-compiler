export const PrintColor = {
    Theme: -1,

    Neutral: 0,
    Red: 1,
    Green: 2,
    Blue: 3,
    Yellow: 4,
    Purple: 5,
    Cyan: 6,
} as const

export type PrintColor = (typeof PrintColor)[keyof typeof PrintColor]
