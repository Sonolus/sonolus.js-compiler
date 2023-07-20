import { Func } from '../../../snode/nodes/Func.js'
import { SNode } from '../../../snode/nodes/index.js'

export const ignoreReturn = (snode: Func): SNode => {
    if (snode.func !== 'Execute') return snode

    const args = snode.args
    if (typeof args[args.length - 1] !== 'number') return snode

    if (args.length === 2) return args[0]

    return {
        func: 'Execute',
        args: snode.args.slice(0, snode.args.length - 1),
    }
}
