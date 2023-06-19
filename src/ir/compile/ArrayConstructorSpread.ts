import { isIterable } from '../../utils/iterable.js'
import { iterateIR } from '../iterate/index.js'
import { ArrayConstructorSpread } from '../nodes/ArrayConstructorSpread.js'
import { isConstant } from '../optimize/transform/utils.js'
import { CompileIR, compileIR } from './index.js'

export const compileArrayConstructorSpread: CompileIR<ArrayConstructorSpread> = (ir, ctx) => {
    for (const child of iterateIR(ir)) {
        compileIR(child, ctx)
    }

    const result = isConstant(ir.arg)
    if (!result) throw ctx.error(ir.arg, 'Spread argument must be resolved at compile time')

    if (!isIterable(result.value)) throw ctx.error(ir.arg, 'Spread argument must be iterable')

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
