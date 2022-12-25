import { OptimizeFunc, optimizeSNode } from './index.js'
import { isEquivalent, isFunc, isFuncs, isValue } from './utils.js'

export const optimizeSetShifted: OptimizeFunc<'SetShifted'> = (snode) => {
    const [id, x, y, s, value] = snode.args

    if (isValue(y) && isValue(s)) {
        if (isValue(x))
            return optimizeSNode({
                func: 'Set',
                args: [id, x + y * s, value],
            })

        if (y === 0 && s === 0)
            return optimizeSNode({
                func: 'Set',
                args: [id, x, value],
            })
    }

    if (
        isFuncs(value, ['Add', 'Subtract', 'Multiply', 'Divide', 'Rem', 'Mod', 'Power']) &&
        value.args.length === 2
    ) {
        if (
            isFunc(value.args[0], 'GetShifted') &&
            isEquivalent(value.args[0].args[0], id) &&
            isEquivalent(value.args[0].args[1], x) &&
            isEquivalent(value.args[0].args[2], y) &&
            isEquivalent(value.args[0].args[3], s)
        )
            return {
                func: `Set${value.func}Shifted`,
                args: [id, x, y, s, value.args[1]],
            }

        if (
            isFunc(value.args[1], 'GetShifted') &&
            isEquivalent(value.args[1].args[0], id) &&
            isEquivalent(value.args[1].args[1], x) &&
            isEquivalent(value.args[1].args[2], y) &&
            isEquivalent(value.args[1].args[3], s)
        )
            return {
                func: `Set${value.func}Shifted`,
                args: [id, x, y, s, value.args[0]],
            }
    }

    return snode
}
