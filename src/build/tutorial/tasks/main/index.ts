import { EngineConfiguration, EngineTutorialData } from 'sonolus-core'
import { buildEngineConfiguration } from '../../../shared/tasks/main/engine/configuration/index.js'
import { clone } from '../../../shared/utils/clone.js'
import { Project } from '../../project.js'
import { buildEngineTutorialData } from './engine/tutorialData/index.js'

export type MainTask = {
    type: 'main'
}

export type MainTaskArtifacts = {
    type: 'main'
    engine: {
        configuration: EngineConfiguration
        tutorialData: EngineTutorialData
    }
}

export const buildMainTask = (project: Project): MainTaskArtifacts =>
    clone({
        type: 'main',
        engine: {
            configuration: buildEngineConfiguration(project.engine.configuration),
            tutorialData: buildEngineTutorialData(project.engine.tutorialData),
        },
    })
