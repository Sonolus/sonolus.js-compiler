import { OptimizeFunc, optimizeSNode } from './index.js'
import { isValue } from './utils.js'

export const optimizeGetShifted: OptimizeFunc<'GetShifted'> = (snode) => {
    const [id, x, y, s] = snode.args

    if (isValue(y) && isValue(s)) {
        if (isValue(x))
            return optimizeSNode({
                func: 'Get',
                args: [id, x + y * s],
            })

        if (y === 0 && s === 0)
            return optimizeSNode({
                func: 'Get',
                args: [id, x],
            })
    }

    return snode
}
