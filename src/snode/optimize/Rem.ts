import { OptimizeFunc } from './index.js'
import { isFunc } from './utils.js'

export const optimizeRem: OptimizeFunc<'Rem'> = (snode) => {
    if (!snode.args.length) return 0

    if (snode.args.length === 1) return snode.args[0]

    if (isFunc(snode.args[0], 'Rem'))
        return {
            func: 'Rem',
            args: [...snode.args[0].args, ...snode.args.slice(1)],
        }

    return snode
}
