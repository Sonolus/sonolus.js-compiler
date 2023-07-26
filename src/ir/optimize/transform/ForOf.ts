import { createCompileESTreeContext } from '../../../estree/compile/context.js'
import { compileForOf } from '../../../estree/compile/utils/forOf.js'
import { hasIntrinsicIterate } from '../../../intrinsic/has.js'
import { Intrinsic } from '../../../intrinsic/index.js'
import { isIterable } from '../../../utils/iterable.js'
import { ForOf } from '../../nodes/ForOf.js'
import { TransformIR } from './index.js'
import { isConstant, rewriteAsExecute, transformIRAndGet } from './utils.js'

export const transformForOf: TransformIR<ForOf> = (ir, ctx) => {
    const value = transformIRAndGet(ir.value, ctx)

    const result = isConstant(value)
    if (!result) return { ...ir, value }

    const estreeCtx = createCompileESTreeContext(ir.stackTraces, ir.thisValue, ir.prototype, ir.env)

    if (hasIntrinsicIterate(result.value))
        return rewriteAsExecute(ir, ctx, [
            value,
            result.value[Intrinsic.Iterate](ir, result.value, estreeCtx, ctx),
            ctx.zero(ir),
        ])

    if (!isIterable(result.value)) return { ...ir, value }

    return rewriteAsExecute(ir, ctx, [
        value,
        compileForOf(
            ir.node,
            [...result.value].map((v) => ctx.value(value, v)),
            estreeCtx,
        ),
        ctx.zero(ir),
    ])
}
