import { Block } from '../nodes/Block.js'
import { compileIR, CompileIR } from './index.js'

export const compileBlock: CompileIR<Block> = (ir, ctx) => {
    ctx.blockStack.unshift(ir.target)

    const args = [compileIR(ir.body, ctx)]

    ctx.blockStack.shift()

    return {
        func: 'Block',
        args,
    }
}
