import { ObjectConstructorAdd } from '../nodes/ObjectConstructorAdd.js'
import { isConstant } from '../optimize/transform/utils.js'
import { CompileIR, compileIR } from './index.js'

export const compileObjectConstructorAdd: CompileIR<ObjectConstructorAdd> = (ir, ctx) => {
    const keyResult = isConstant(ir.key)
    if (!keyResult) {
        compileIR(ir.key, ctx)

        throw ctx.error(ir.key, 'Key must be resolved at compile time')
    }

    if (ir.kind === 'get' || ir.kind === 'set') {
        const valueResult = isConstant(ir.value)
        if (!valueResult) {
            compileIR(ir.value, ctx)

            throw ctx.error(ir.value, 'Getter/setter must be resolved at compile time')
        }
    }

    compileIR(ir.value, ctx)

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
