import { OptimizeFunc } from './index.js'
import { isFunc } from './utils.js'

export const optimizePower: OptimizeFunc<'Power'> = (snode) => {
    if (!snode.args.length) return 0

    if (snode.args.length === 1) return snode.args[0]

    if (isFunc(snode.args[0], 'Power'))
        return {
            func: 'Power',
            args: [...snode.args[0].args, ...snode.args.slice(1)],
        }

    return snode
}
