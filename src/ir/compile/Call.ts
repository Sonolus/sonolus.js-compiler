import { iterateIR } from '../iterate/index.js'
import { Call } from '../nodes/Call.js'
import { CompileIR, compileIR } from './index.js'

export const compileCall: CompileIR<Call> = (ir, ctx) => {
    for (const child of iterateIR(ir)) {
        compileIR(child, ctx)
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
