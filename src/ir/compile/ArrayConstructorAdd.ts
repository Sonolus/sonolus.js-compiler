import { iterateIR } from '../iterate/index.js'
import { ArrayConstructorAdd } from '../nodes/ArrayConstructorAdd.js'
import { CompileIR, compileIR } from './index.js'

export const compileArrayConstructorAdd: CompileIR<ArrayConstructorAdd> = (ir, ctx) => {
    for (const child of iterateIR(ir)) {
        compileIR(child, ctx)
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
