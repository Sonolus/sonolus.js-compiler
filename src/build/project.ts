import { EngineConfiguration, EngineData, EngineDataBucket, LevelData } from 'sonolus-core'
import { Archetypes } from '../lib/define/archetypes.js'

export type Project = {
    engine: {
        configuration: EngineConfiguration
        data: {
            skin: EngineData['skin']
            effect: EngineData['effect']
            particle: EngineData['particle']
            buckets: EngineDataBucket[]
            archetypes: Archetypes
            globalResolver: (name: string) => unknown
        }
    }
    level: {
        data: LevelData
    }
}
