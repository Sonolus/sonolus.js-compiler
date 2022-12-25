export const Judgment = {
    Miss: 0,
    Perfect: 1,
    Great: 2,
    Good: 3,
} as const

export type Judgment = (typeof Judgment)[keyof typeof Judgment]
