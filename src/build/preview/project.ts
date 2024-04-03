import { EngineConfiguration, EnginePreviewData, LevelData } from '@sonolus/core'
import { Archetypes } from '../../lib/play/define/archetypes.js'

export type Project = {
    engine: {
        configuration: EngineConfiguration
        previewData: {
            skin: EnginePreviewData['skin']
            archetypes: Archetypes
            globalResolver: (name: string) => unknown
        }
    }
    level: {
        data: LevelData
    }
}
