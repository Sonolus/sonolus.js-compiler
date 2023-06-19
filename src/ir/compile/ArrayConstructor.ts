import { ArrayConstructor } from '../nodes/ArrayConstructor.js'
import { CompileIR, compileIR } from './index.js'

export const compileArrayConstructor: CompileIR<ArrayConstructor> = (ir, ctx) => {
    for (const child of ir.children) {
        compileIR(child, ctx)
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
