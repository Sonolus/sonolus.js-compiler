import { Reference } from '../nodes/Reference.js'
import { CompileIR } from './index.js'

export const compileReference: CompileIR<Reference> = (ir, ctx) => {
    throw ctx.error(ir, `${ir.name} is not defined`)
}
