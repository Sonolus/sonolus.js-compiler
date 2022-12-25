import { OptimizeFunc, optimizeSNode } from './index.js'
import { isEquivalent, isFunc, isFuncs } from './utils.js'

export const optimizeSet: OptimizeFunc<'Set'> = (snode) => {
    const [id, index, value] = snode.args

    if (
        isFunc(index, 'Add') &&
        index.args.length === 2 &&
        isFunc(index.args[1], 'Multiply') &&
        index.args[1].args.length === 2
    )
        return optimizeSNode({
            func: 'SetShifted',
            args: [id, index.args[0], index.args[1].args[0], index.args[1].args[1], value],
        })

    if (
        isFuncs(value, ['Add', 'Subtract', 'Multiply', 'Divide', 'Rem', 'Mod', 'Power']) &&
        value.args.length === 2
    ) {
        if (
            isFunc(value.args[0], 'Get') &&
            isEquivalent(value.args[0].args[0], id) &&
            isEquivalent(value.args[0].args[1], index)
        )
            return {
                func: `Set${value.func}`,
                args: [id, index, value.args[1]],
            }

        if (
            isFunc(value.args[1], 'Get') &&
            isEquivalent(value.args[1].args[0], id) &&
            isEquivalent(value.args[1].args[1], index)
        )
            return {
                func: `Set${value.func}`,
                args: [id, index, value.args[0]],
            }
    }

    return snode
}
