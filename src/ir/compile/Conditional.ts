import { Conditional } from '../nodes/Conditional.js'
import { CompileIR } from './index.js'

export const compileConditional: CompileIR<Conditional> = (ir, ctx) =>
    ctx.func('If', ir.test, ir.consequent, ir.alternate)
