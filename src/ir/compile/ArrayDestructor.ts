import { isIterable } from '../../utils/iterable.js'
import { ArrayDestructor } from '../nodes/ArrayDestructor.js'
import { isConstant } from '../optimize/transform/utils.js'
import { CompileIR, compileIR } from './index.js'

export const compileArrayDestructor: CompileIR<ArrayDestructor> = (ir, ctx) => {
    const result = isConstant(ir.array)
    if (!result) {
        compileIR(ir.array, ctx)

        throw ctx.error(ir.array, 'Destructor target must be resolved at compile time')
    }

    if (!isIterable(result.value)) throw ctx.error(ir.array, 'Destructor target must be iterable')

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
