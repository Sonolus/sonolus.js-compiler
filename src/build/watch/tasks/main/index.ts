import { EngineConfiguration, EngineWatchData, LevelData } from 'sonolus-core'
import { buildEngineConfiguration } from '../../../shared/tasks/main/engine/configuration/index.js'
import { clone } from '../../../shared/utils/clone.js'
import { Project } from '../../project.js'
import { buildEngineWatchData } from './engine/watchData/index.js'
import { buildLevelData } from './level/data/index.js'

export type MainTask = {
    type: 'main'
}

export type MainTaskArtifacts = {
    type: 'main'
    engine: {
        configuration: EngineConfiguration
        watchData: EngineWatchData
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
            watchData: buildEngineWatchData(project.engine.watchData),
        },
        level: {
            data: buildLevelData(project.level.data),
        },
    })
