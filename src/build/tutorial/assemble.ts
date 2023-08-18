import { EngineConfiguration, EngineTutorialData } from 'sonolus-core'
import { TutorialCallback } from '../../index.tutorial.js'
import { SNode } from '../../snode/nodes/index.js'
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

    const callbacks = Object.values(TutorialCallback).map((callback) => ({
        callback,
        results: compiles
            .filter((compile) => compile.callback === callback)
            .sort((a, b) => a.index - b.index)
            .map((compile) => compile.result)
            .filter((result): result is SNode => !!result),
    }))

    for (const { callback, results } of callbacks) {
        if (!results.length) continue

        const snode: SNode =
            results.length === 1
                ? results[0]
                : {
                      func: 'Execute',
                      args: results,
                  }

        main.engine.tutorialData[callback] = appendSNode(snode)
    }

    return main
}
