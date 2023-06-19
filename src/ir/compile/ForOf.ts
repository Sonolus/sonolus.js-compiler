import { isIterable } from '../../utils/iterable.js'
import { ForOf } from '../nodes/ForOf.js'
import { isConstant } from '../optimize/transform/utils.js'
import { CompileIR, compileIR } from './index.js'

export const compileForOf: CompileIR<ForOf> = (ir, ctx) => {
    const result = isConstant(ir.value)
    if (!result) {
        compileIR(ir.value, ctx)

        throw ctx.error(ir.value, 'Value must be resolved at compile time')
    }

    if (!isIterable(result.value)) throw ctx.error(ir.value, 'Value must be iterable')

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
