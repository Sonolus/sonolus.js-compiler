import { iterateIR } from '../iterate/index.js'
import { JSCall } from '../nodes/JSCall.js'
import { CompileIR, compileIR } from './index.js'

export const compileJSCall: CompileIR<JSCall> = (ir, ctx) => {
    for (const child of iterateIR(ir)) {
        compileIR(child, ctx)
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
