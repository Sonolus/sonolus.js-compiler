export const NavigationDirection = {
    Previous: -1,
    None: 0,
    Next: 1,
} as const

export type NavigationDirection = (typeof NavigationDirection)[keyof typeof NavigationDirection]
