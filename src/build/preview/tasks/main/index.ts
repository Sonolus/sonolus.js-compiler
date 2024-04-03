import { EngineConfiguration, EnginePreviewData, LevelData } from '@sonolus/core'
import { buildEngineConfiguration } from '../../../shared/tasks/main/engine/configuration/index.js'
import { clone } from '../../../shared/utils/clone.js'
import { Project } from '../../project.js'
import { buildEnginePreviewData } from './engine/playData/index.js'
import { buildLevelData } from './level/data/index.js'

export type MainTask = {
    type: 'main'
}

export type MainTaskArtifacts = {
    type: 'main'
    engine: {
        configuration: EngineConfiguration
        previewData: EnginePreviewData
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
            previewData: buildEnginePreviewData(project.engine.previewData),
        },
        level: {
            data: buildLevelData(project.level.data),
        },
    })
