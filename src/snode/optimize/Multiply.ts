import { Func } from '../nodes/Func.js'
import { OptimizeFunc } from './index.js'
import { isFunc, isValue } from './utils.js'

export const optimizeMultiply: OptimizeFunc<'Multiply'> = (snode) => {
    if (!snode.args.length) return 0

    const args = snode.args.flatMap((arg) => (isFunc(arg, 'Multiply') ? arg.args : [arg]))

    let constants = 1
    const dynamics: Func[] = []

    for (const arg of args) {
        if (isValue(arg)) {
            constants *= arg
        } else {
            dynamics.push(arg)
        }
    }

    if (!dynamics.length) return constants

    if (constants === 0)
        return {
            func: 'Execute',
            args: [...dynamics, 0],
        }

    if (constants === 1) {
        if (dynamics.length === 1) return dynamics[0]

        return {
            func: 'Multiply',
            args: dynamics,
        }
    }

    return {
        func: 'Multiply',
        args: [constants, ...dynamics],
    }
}
