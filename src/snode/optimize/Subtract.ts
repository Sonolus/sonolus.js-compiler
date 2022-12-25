import { Func } from '../nodes/Func.js'
import { OptimizeFunc } from './index.js'
import { isFunc, isValue } from './utils.js'

export const optimizeSubtract: OptimizeFunc<'Subtract'> = (snode) => {
    if (!snode.args.length) return 0

    const [head, ...rest] = isFunc(snode.args[0], 'Subtract')
        ? [...snode.args[0].args, ...snode.args.slice(1)]
        : snode.args

    let constants = 0
    const dynamics: Func[] = []

    for (const arg of rest) {
        if (isValue(arg)) {
            constants += arg
        } else {
            dynamics.push(arg)
        }
    }

    if (constants === 0) {
        if (!dynamics.length) return head

        return {
            func: 'Subtract',
            args: [head, ...dynamics],
        }
    }

    return {
        func: 'Subtract',
        args: [head, constants, ...dynamics],
    }
}
