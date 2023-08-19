import { RuntimeFunction } from 'sonolus-core'
import { Func } from '../nodes/Func.js'
import { SNode } from '../nodes/index.js'
import { optimizeAdd } from './Add.js'
import { optimizeDivide } from './Divide.js'
import { optimizeGet } from './Get.js'
import { optimizeGetShifted } from './GetShifted.js'
import { optimizeIf } from './If.js'
import { optimizeMod } from './Mod.js'
import { optimizeMultiply } from './Multiply.js'
import { optimizePower } from './Power.js'
import { optimizeRem } from './Rem.js'
import { optimizeSet } from './Set.js'
import { optimizeSetShifted } from './SetShifted.js'
import { optimizeSubtract } from './Subtract.js'
import { optimizeWhile } from './While.js'
import { isValue } from './utils.js'

export type OptimizeFunc<T extends RuntimeFunction> = (snode: Func<T>) => SNode

const optimizers: {
    [K in RuntimeFunction as `optimize${K}`]?: OptimizeFunc<K>
} = {
    optimizeAdd,
    optimizeDivide,
    optimizeGet,
    optimizeGetShifted,
    optimizeIf,
    optimizeMod,
    optimizeMultiply,
    optimizePower,
    optimizeRem,
    optimizeSet,
    optimizeSetShifted,
    optimizeSubtract,
    optimizeWhile,
}

export const optimizeSNode = (snode: SNode): SNode => {
    if (isValue(snode)) return snode

    const func = snode.func
    const args = snode.args.map(optimizeSNode)
    const newSNode = {
        func,
        args,
    }

    const optimizer = optimizers[`optimize${func}`]
    if (!optimizer) return newSNode

    return optimizer(newSNode as never)
}
