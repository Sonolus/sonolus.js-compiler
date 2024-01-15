import { EngineConfiguration, EngineDataBucket, EnginePlayData, LevelData } from 'sonolus-core'
import { Archetypes } from '../../lib/play/define/archetypes.js'

export type Project = {
    engine: {
        configuration: EngineConfiguration
        playData: {
            skin: EnginePlayData['skin']
            effect: EnginePlayData['effect']
            particle: EnginePlayData['particle']
            buckets: EngineDataBucket[]
            archetypes: Archetypes
            globalResolver: (name: string) => unknown
        }
    }
    level: {
        data: LevelData
    }
}
