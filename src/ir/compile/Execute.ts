import { Execute } from '../nodes/Execute.js'
import { CompileIR } from './index.js'

export const compileExecute: CompileIR<Execute> = (ir, ctx) => ctx.func('Execute', ...ir.children)
