export const Callback = {
    Preprocess: 'preprocess',
    SpawnOrder: 'spawnOrder',
    ShouldSpawn: 'shouldSpawn',
    Initialize: 'initialize',
    UpdateSequential: 'updateSequential',
    Touch: 'touch',
    UpdateParallel: 'updateParallel',
    Terminate: 'terminate',
} as const

export type Callback = (typeof Callback)[keyof typeof Callback]
