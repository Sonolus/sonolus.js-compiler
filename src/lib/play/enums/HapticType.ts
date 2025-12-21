export const HapticType = {
    None: 0,
    Light: 1,
    Medium: 2,
    Heavy: 3,
    Long: 4,
} as const

export type HapticType = (typeof HapticType)[keyof typeof HapticType]
