import { OptimizeFunc, optimizeSNode } from './index.js'
import { isFunc } from './utils.js'

export const optimizeGet: OptimizeFunc<'Get'> = (snode) => {
    const [id, index] = snode.args

    if (
        isFunc(index, 'Add') &&
        index.args.length === 2 &&
        isFunc(index.args[1], 'Multiply') &&
        index.args[1].args.length === 2
    )
        return optimizeSNode({
            func: 'GetShifted',
            args: [id, index.args[0], index.args[1].args[0], index.args[1].args[1]],
        })

    return snode
}
