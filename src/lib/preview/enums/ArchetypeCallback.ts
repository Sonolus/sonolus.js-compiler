export const ArchetypeCallback = {
    Preprocess: 'preprocess',
    Render: 'render',
} as const

export type ArchetypeCallback = (typeof ArchetypeCallback)[keyof typeof ArchetypeCallback]
