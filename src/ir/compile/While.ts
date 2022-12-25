import { While } from '../nodes/While.js'
import { CompileIR } from './index.js'

export const compileWhile: CompileIR<While> = (ir, ctx) => ctx.func('While', ir.test, ir.body)
