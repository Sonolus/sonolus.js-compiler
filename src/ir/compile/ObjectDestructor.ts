import { isSpreadable } from '../../utils/spreadable.js'
import { ObjectDestructor } from '../nodes/ObjectDestructor.js'
import { isConstant } from '../optimize/transform/utils.js'
import { CompileIR, compileIR } from './index.js'

export const compileObjectDestructor: CompileIR<ObjectDestructor> = (ir, ctx) => {
    const result = isConstant(ir.object)
    if (!result) {
        compileIR(ir.object, ctx)

        throw ctx.error(ir.object, 'Destructor target must be resolved at compile time')
    }

    if (!isSpreadable(result.value))
        throw ctx.error(ir.object, 'Destructor target must be spreadable')

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
