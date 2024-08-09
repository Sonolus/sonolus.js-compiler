import { Reference } from '../../nodes/Reference.js'
import { TransformIR } from './index.js'

export const transformReference: TransformIR<Reference> = (ir, ctx) => {
    try {
        return ctx.value(ir, ir.env.lexical.get(ir.name))
    } catch {
        return ir
    }
}
