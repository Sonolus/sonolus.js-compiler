export const EntityState = {
    Waiting: 0,
    Active: 1,
    Despawned: 2,
} as const

export type EntityState = (typeof EntityState)[keyof typeof EntityState]
