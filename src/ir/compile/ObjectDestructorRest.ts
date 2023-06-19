import { iterateIR } from '../iterate/index.js'
import { ObjectDestructorRest } from '../nodes/ObjectDestructorRest.js'
import { CompileIR, compileIR } from './index.js'

export const compileObjectDestructorRest: CompileIR<ObjectDestructorRest> = (ir, ctx) => {
    for (const child of iterateIR(ir)) {
        compileIR(child, ctx)
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
