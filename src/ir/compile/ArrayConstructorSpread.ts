import { iterateIR } from '../iterate/index.js'
import { ArrayConstructorSpread } from '../nodes/ArrayConstructorSpread.js'
import { CompileIR, compileIR } from './index.js'

export const compileArrayConstructorSpread: CompileIR<ArrayConstructorSpread> = (ir, ctx) => {
    for (const child of iterateIR(ir)) {
        compileIR(child, ctx)
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
