import { ObjectDestructorGet } from '../nodes/ObjectDestructorGet.js'
import { isConstant } from '../optimize/transform/utils.js'
import { CompileIR, compileIR } from './index.js'

export const compileObjectDestructorGet: CompileIR<ObjectDestructorGet> = (ir, ctx) => {
    const result = isConstant(ir.key)
    if (!result) {
        compileIR(ir.key, ctx)

        throw ctx.error(ir.key, 'Key must be resolved at compile time')
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
