import { iterateIR } from '../iterate/index.js'
import { ArrayDestructor } from '../nodes/ArrayDestructor.js'
import { isConstant } from '../optimize/transform/utils.js'
import { CompileIR, compileIR } from './index.js'

export const compileArrayDestructor: CompileIR<ArrayDestructor> = (ir, ctx) => {
    for (const child of iterateIR(ir)) {
        compileIR(child, ctx)
    }

    const result = isConstant(ir.array)
    if (!result) throw ctx.error(ir.array, 'Destructor target must be resolved at compile time')

    throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
}
