export const ArchetypeCallback = {
    Preprocess: 'preprocess',
    SpawnOrder: 'spawnOrder',
    ShouldSpawn: 'shouldSpawn',
    Initialize: 'initialize',
    UpdateSequential: 'updateSequential',
    Touch: 'touch',
    UpdateParallel: 'updateParallel',
    Terminate: 'terminate',
} as const

export type ArchetypeCallback = (typeof ArchetypeCallback)[keyof typeof ArchetypeCallback]
