import { EngineConfiguration, EngineDataNode, EnginePlayData, LevelData } from 'sonolus-core'
import { SNode } from '../snode/nodes/index.js'
import { CompileTaskArtifacts } from './tasks/compile/index.js'
import { MainTaskArtifacts } from './tasks/main/index.js'

export type Artifacts = {
    engine: {
        configuration: EngineConfiguration
        playData: EnginePlayData
    }
    level: {
        data: LevelData
    }
}

export const assemble = (main: MainTaskArtifacts, compiles: CompileTaskArtifacts[]): Artifacts => {
    const cache = new Map<string, number>()

    const append = (key: string, node: EngineDataNode) => {
        let index = cache.get(key)
        if (index !== undefined) return index

        index = main.engine.playData.nodes.push(node) - 1
        cache.set(key, index)

        return index
    }

    const appendSNode = (snode: SNode): number => {
        if (typeof snode === 'number')
            return append(`${snode}`, {
                value: snode,
            })

        const func = snode.func
        const args = snode.args.map(appendSNode)

        return append(`${func}:${args}`, {
            func,
            args,
        })
    }

    for (const { index, callback, result } of compiles) {
        if (!result) continue

        main.engine.playData.archetypes[index][callback] = {
            index: appendSNode(result.snode),
            order: result.order,
        }
    }

    return main
}
