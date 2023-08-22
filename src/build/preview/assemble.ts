import { EngineConfiguration, EnginePreviewData, LevelData } from 'sonolus-core'
import { createAppendSNode } from '../shared/assemble.js'
import { CompileTaskArtifacts } from './tasks/compile/index.js'
import { MainTaskArtifacts } from './tasks/main/index.js'

export type Artifacts = {
    engine: {
        configuration: EngineConfiguration
        previewData: EnginePreviewData
    }
    level: {
        data: LevelData
    }
}

export const assemble = (main: MainTaskArtifacts, compiles: CompileTaskArtifacts[]): Artifacts => {
    const appendSNode = createAppendSNode(main.engine.previewData.nodes)

    for (const { index, callback, result } of compiles) {
        if (!result) continue

        main.engine.previewData.archetypes[index][callback] = {
            index: appendSNode(result.snode),
            order: result.order,
        }
    }

    return main
}
