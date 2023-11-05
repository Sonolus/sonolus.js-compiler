import { EngineConfiguration, EngineWatchData, LevelData } from 'sonolus-core'
import { Archetypes } from '../../lib/watch/define/archetypes.js'

export type Project = {
    engine: {
        configuration: EngineConfiguration
        watchData: {
            skin: EngineWatchData['skin']
            effect: EngineWatchData['effect']
            particle: EngineWatchData['particle']
            archetypes: Archetypes
            updateSpawn: () => number
            globalResolver: (name: string) => unknown
        }
    }
    level: {
        data: LevelData
    }
}
