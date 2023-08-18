export const TutorialCallback = {
    Preprocess: 'preprocess',
    Navigate: 'navigate',
    Update: 'update',
} as const

export type TutorialCallback = (typeof TutorialCallback)[keyof typeof TutorialCallback]
