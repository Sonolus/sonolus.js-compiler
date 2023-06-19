import { ArrayConstructorAdd } from '../nodes/ArrayConstructorAdd.js'
import { CompileIR, compileIR } from './index.js'

export const compileArrayConstructorAdd: CompileIR<ArrayConstructorAdd> = (ir, ctx) => {
    compileIR(ir.value, ctx)

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
