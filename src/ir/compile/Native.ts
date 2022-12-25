import { Native } from '../nodes/Native.js'
import { CompileIR } from './index.js'

export const compileNative: CompileIR<Native> = (ir, ctx) => ctx.func(ir.func, ...ir.args)
