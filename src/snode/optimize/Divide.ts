import { Func } from '../nodes/Func.js'
import { OptimizeFunc } from './index.js'
import { isFunc, isValue } from './utils.js'

export const optimizeDivide: OptimizeFunc<'Divide'> = (snode) => {
    if (!snode.args.length) return 0

    const [head, ...rest] = isFunc(snode.args[0], 'Divide')
        ? [...snode.args[0].args, ...snode.args.slice(1)]
        : snode.args

    let constants = 1
    const dynamics: Func[] = []

    for (const arg of rest) {
        if (isValue(arg)) {
            constants *= arg
        } else {
            dynamics.push(arg)
        }
    }

    if (constants === 1) {
        if (!dynamics.length) return head

        return {
            func: 'Divide',
            args: [head, ...dynamics],
        }
    }

    return {
        func: 'Divide',
        args: [head, constants, ...dynamics],
    }
}
