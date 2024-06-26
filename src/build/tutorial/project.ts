import { EngineConfiguration, EngineTutorialData } from '@sonolus/core'
import { TutorialCallback } from '../../lib/tutorial/index.js'

export type Project = {
    engine: {
        configuration: EngineConfiguration
        tutorialData: {
            skin: EngineTutorialData['skin']
            effect: EngineTutorialData['effect']
            particle: EngineTutorialData['particle']
            instruction: EngineTutorialData['instruction']
            tutorial: Partial<Record<TutorialCallback, ((index: number) => void)[]>>
            globalResolver: (name: string) => unknown
        }
    }
}
