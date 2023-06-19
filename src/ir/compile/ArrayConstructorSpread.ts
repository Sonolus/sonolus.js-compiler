import { iterateIR } from '../iterate/index.js'
import { ArrayConstructorSpread } from '../nodes/ArrayConstructorSpread.js'
import { isConstant } from '../optimize/transform/utils.js'
import { CompileIR, compileIR } from './index.js'

export const compileArrayConstructorSpread: CompileIR<ArrayConstructorSpread> = (ir, ctx) => {
    for (const child of iterateIR(ir)) {
        compileIR(child, ctx)
    }

    if (!isConstant(ir.arg))
        throw ctx.error(ir.arg, 'Spread argument must be resolved at compile time')

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
