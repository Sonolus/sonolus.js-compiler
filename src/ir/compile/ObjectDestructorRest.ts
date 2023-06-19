import { ObjectDestructorRest } from '../nodes/ObjectDestructorRest.js'
import { CompileIR } from './index.js'

export const compileObjectDestructorRest: CompileIR<ObjectDestructorRest> = (ir, ctx) => {
    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
