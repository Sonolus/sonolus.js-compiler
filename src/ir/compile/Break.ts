import { Break } from '../nodes/Break.js'
import { compileIR, CompileIR } from './index.js'

export const compileBreak: CompileIR<Break> = (ir, ctx) => ({
    func: 'Break',
    args: [ctx.blockStack.indexOf(ir.target) + 1, compileIR(ir.value, ctx)],
})
