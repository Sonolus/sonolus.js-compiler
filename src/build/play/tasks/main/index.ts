import { EngineConfiguration, EnginePlayData, LevelData } from 'sonolus-core'
import { buildEngineConfiguration } from '../../../shared/tasks/main/engine/configuration/index.js'
import { clone } from '../../../shared/utils/clone.js'
import { Project } from '../../project.js'
import { buildEnginePlayData } from './engine/playData/index.js'
import { buildLevelData } from './level/data/index.js'

export type MainTask = {
    type: 'main'
}

export type MainTaskArtifacts = {
    type: 'main'
    engine: {
        configuration: EngineConfiguration
        playData: EnginePlayData
    }
    level: {
        data: LevelData
    }
}

export const buildMainTask = (project: Project): MainTaskArtifacts =>
    clone({
        type: 'main',
        engine: {
            configuration: buildEngineConfiguration(project.engine.configuration),
            playData: buildEnginePlayData(project.engine.playData),
        },
        level: {
            data: buildLevelData(project.level.data),
        },
    })
