export const EntityState = {
    Inactive: 0,
    Active: 1,
} as const

export type EntityState = (typeof EntityState)[keyof typeof EntityState]
