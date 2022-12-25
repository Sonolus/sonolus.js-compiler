import { OptimizeFunc } from './index.js'
import { isFunc } from './utils.js'

export const optimizeMod: OptimizeFunc<'Mod'> = (snode) => {
    if (!snode.args.length) return 0

    if (snode.args.length === 1) return snode.args[0]

    if (isFunc(snode.args[0], 'Mod'))
        return {
            func: 'Mod',
            args: [...snode.args[0].args, ...snode.args.slice(1)],
        }

    return snode
}
