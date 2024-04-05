import { EngineDataNode } from '@sonolus/core'
import { SNode } from '../../snode/nodes/index.js'

export const createAppendSNode = (nodes: EngineDataNode[]): ((snode: SNode) => number) => {
    const cache = new Map<string, number>()

    const append = (key: string, node: EngineDataNode) => {
        let index = cache.get(key)
        if (index !== undefined) return index

        index = nodes.push(node) - 1
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

        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return append(`${func}:${args}`, {
            func,
            args,
        })
    }

    return appendSNode
}
