import { iterateIR } from '../iterate/index.js'
import { ObjectConstructor } from '../nodes/ObjectConstructor.js'
import { CompileIR, compileIR } from './index.js'

export const compileObjectConstructor: CompileIR<ObjectConstructor> = (ir, ctx) => {
    for (const child of iterateIR(ir)) {
        compileIR(child, ctx)
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
