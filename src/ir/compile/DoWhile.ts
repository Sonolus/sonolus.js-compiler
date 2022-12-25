import { DoWhile } from '../nodes/DoWhile.js'
import { CompileIR } from './index.js'

export const compileDoWhile: CompileIR<DoWhile> = (ir, ctx) => ctx.func('DoWhile', ir.body, ir.test)
