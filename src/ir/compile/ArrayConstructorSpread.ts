import { isIterable } from '../../utils/iterable.js'
import { ArrayConstructorSpread } from '../nodes/ArrayConstructorSpread.js'
import { isConstant } from '../optimize/transform/utils.js'
import { CompileIR, compileIR } from './index.js'

export const compileArrayConstructorSpread: CompileIR<ArrayConstructorSpread> = (ir, ctx) => {
    const result = isConstant(ir.arg)
    if (!result) {
        compileIR(ir.arg, ctx)

        throw ctx.error(ir.arg, 'Spread argument must be resolved at compile time')
    }

    if (!isIterable(result.value)) throw ctx.error(ir.arg, 'Spread argument must be iterable')

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
