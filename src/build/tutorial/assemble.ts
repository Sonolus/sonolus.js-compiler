import { EngineConfiguration, EngineTutorialData } from 'sonolus-core'
import { createAppendSNode } from '../shared/assemble.js'
import { CompileTaskArtifacts } from './tasks/compile/index.js'
import { MainTaskArtifacts } from './tasks/main/index.js'

export type Artifacts = {
    engine: {
        configuration: EngineConfiguration
        tutorialData: EngineTutorialData
    }
}

export const assemble = (main: MainTaskArtifacts, compiles: CompileTaskArtifacts[]): Artifacts => {
    const appendSNode = createAppendSNode(main.engine.tutorialData.nodes)

    for (const { callback, result } of compiles) {
        if (!result) continue

        main.engine.tutorialData[callback] = appendSNode(result)
    }

    return main
}
