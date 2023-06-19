import { iterateIR } from '../iterate/index.js'
import { ObjectDestructorGet } from '../nodes/ObjectDestructorGet.js'
import { CompileIR, compileIR } from './index.js'

export const compileObjectDestructorGet: CompileIR<ObjectDestructorGet> = (ir, ctx) => {
    for (const child of iterateIR(ir)) {
        compileIR(child, ctx)
    }

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
