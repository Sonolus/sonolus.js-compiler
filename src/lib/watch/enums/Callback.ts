export const Callback = {
    Preprocess: 'preprocess',
    SpawnTime: 'spawnTime',
    DespawnTime: 'despawnTime',
    Initialize: 'initialize',
    UpdateSequential: 'updateSequential',
    UpdateParallel: 'updateParallel',
    Terminate: 'terminate',
    UpdateSpawn: 'updateSpawn',
} as const

export type Callback = (typeof Callback)[keyof typeof Callback]
