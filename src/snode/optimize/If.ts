import { OptimizeFunc, optimizeSNode } from './index.js'

export const optimizeIf: OptimizeFunc<'If'> = (snode) => {
    if (snode.args[2] === 0)
        return optimizeSNode({
            func: 'And',
            args: [snode.args[0], snode.args[1]],
        })

    return snode
}
