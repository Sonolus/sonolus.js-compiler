import { iterateIR } from '../iterate/index.js'
import { ObjectDestructor } from '../nodes/ObjectDestructor.js'
import { CompileIR, compileIR } from './index.js'

export const compileObjectDestructor: CompileIR<ObjectDestructor> = (ir, ctx) => {
    for (const child of iterateIR(ir)) {
        compileIR(child, ctx)
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
