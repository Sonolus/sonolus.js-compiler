import { Set } from '../nodes/Set.js'
import { compileIR, CompileIR } from './index.js'

export const compileSet: CompileIR<Set> = (ir, ctx) => ({
    func: 'Set',
    args: [10000, ctx.get(ir.target), compileIR(ir.value, ctx)],
})
