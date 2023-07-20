import { EngineConfiguration, EnginePlayData, LevelData } from 'sonolus-core'
import { Project } from '../../project.js'
import { buildEngineConfiguration } from './engine/configuration/index.js'
import { buildEngineData } from './engine/data/index.js'
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
    JSON.parse(
        JSON.stringify({
            type: 'main',
            engine: {
                configuration: buildEngineConfiguration(project.engine.configuration),
                playData: buildEngineData(project.engine.playData),
            },
            level: {
                data: buildLevelData(project.level.data),
            },
        }),
    )
