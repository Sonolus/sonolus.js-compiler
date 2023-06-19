import { iterateIR } from '../iterate/index.js'
import { ObjectConstructorSpread } from '../nodes/ObjectConstructorSpread.js'
import { CompileIR, compileIR } from './index.js'

export const compileObjectConstructorSpread: CompileIR<ObjectConstructorSpread> = (ir, ctx) => {
    for (const child of iterateIR(ir)) {
        compileIR(child, ctx)
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
