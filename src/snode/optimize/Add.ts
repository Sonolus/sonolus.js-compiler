import { Func } from '../nodes/Func.js'
import { OptimizeFunc } from './index.js'
import { isFunc, isValue } from './utils.js'

export const optimizeAdd: OptimizeFunc<'Add'> = (snode) => {
    if (!snode.args.length) return 0

    const args = snode.args.flatMap((arg) => (isFunc(arg, 'Add') ? arg.args : [arg]))

    let constants = 0
    const dynamics: Func[] = []

    for (const arg of args) {
        if (isValue(arg)) {
            constants += arg
        } else {
            dynamics.push(arg)
        }
    }

    if (!dynamics.length) return constants

    if (constants === 0) {
        if (dynamics.length === 1) return dynamics[0]

        return {
            func: 'Add',
            args: dynamics,
        }
    }

    return {
        func: 'Add',
        args: [constants, ...dynamics],
    }
}
