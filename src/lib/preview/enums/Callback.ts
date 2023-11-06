export const Callback = {
    Preprocess: 'preprocess',
    Render: 'render',
} as const

export type Callback = (typeof Callback)[keyof typeof Callback]
