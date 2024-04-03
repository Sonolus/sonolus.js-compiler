import { EngineConfiguration, EngineWatchData, LevelData } from '@sonolus/core'
import { Callback } from '../../lib/watch/enums/Callback.js'
import { createAppendSNode } from '../shared/assemble.js'
import { CompileTaskArtifacts } from './tasks/compile/index.js'
import { MainTaskArtifacts } from './tasks/main/index.js'

export type Artifacts = {
    engine: {
        configuration: EngineConfiguration
        watchData: EngineWatchData
    }
    level: {
        data: LevelData
    }
}

export const assemble = (main: MainTaskArtifacts, compiles: CompileTaskArtifacts[]): Artifacts => {
    const appendSNode = createAppendSNode(main.engine.watchData.nodes)

    for (const compile of compiles) {
        if (compile.callback === Callback.UpdateSpawn) {
            const { callback, result } = compile
            if (!result) continue

            main.engine.watchData[callback] = appendSNode(result)
        } else {
            const { index, callback, result } = compile
            if (!result) continue

            main.engine.watchData.archetypes[index][callback] = {
                index: appendSNode(result.snode),
                order: result.order,
            }
        }
    }

    return main
}
