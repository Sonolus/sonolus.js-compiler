import { Get } from '../nodes/Get.js'
import { CompileIR } from './index.js'

export const compileGet: CompileIR<Get> = (ir, ctx) => ({
    func: 'Get',
    args: [10000, ctx.get(ir.target)],
})
