import { EngineConfiguration, EnginePlayData, EnginePlayDataBucket, LevelData } from 'sonolus-core'
import { Archetypes } from '../lib/define/archetypes.js'

export type Project = {
    engine: {
        configuration: EngineConfiguration
        playData: {
            skin: EnginePlayData['skin']
            effect: EnginePlayData['effect']
            particle: EnginePlayData['particle']
            buckets: EnginePlayDataBucket[]
            archetypes: Archetypes
            globalResolver: (name: string) => unknown
        }
    }
    level: {
        data: LevelData
    }
}
