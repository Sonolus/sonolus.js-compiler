import { iterateIR } from '../iterate/index.js'
import { ObjectConstructorAdd } from '../nodes/ObjectConstructorAdd.js'
import { CompileIR, compileIR } from './index.js'

export const compileObjectConstructorAdd: CompileIR<ObjectConstructorAdd> = (ir, ctx) => {
    for (const child of iterateIR(ir)) {
        compileIR(child, ctx)
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
