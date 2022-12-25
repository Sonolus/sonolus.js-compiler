import { OptimizeFunc } from './index.js'
import { isFunc, isValue } from './utils.js'

export const optimizeWhile: OptimizeFunc<'While'> = (snode) => {
    if (
        !isFunc(snode.args[1], 'Execute') ||
        !isValue(snode.args[1].args[snode.args[1].args.length - 1])
    )
        return snode

    if (snode.args[1].args.length === 2)
        return {
            func: 'While',
            args: [snode.args[0], snode.args[1].args[0]],
        }

    return {
        func: 'While',
        args: [
            snode.args[0],
            {
                func: 'Execute',
                args: snode.args[1].args.slice(0, -1),
            },
        ],
    }
}
