import { isSpreadable } from '../../utils/spreadable.js'
import { ObjectConstructorSpread } from '../nodes/ObjectConstructorSpread.js'
import { isConstant } from '../optimize/transform/utils.js'
import { CompileIR, compileIR } from './index.js'

export const compileObjectConstructorSpread: CompileIR<ObjectConstructorSpread> = (ir, ctx) => {
    const result = isConstant(ir.arg)
    if (!result) {
        compileIR(ir.arg, ctx)

        throw ctx.error(ir.arg, 'Spread argument must be resolved at compile time')
    }

    if (!isSpreadable(result.value)) throw ctx.error(ir.arg, 'Spread argument must be spreadable')

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
