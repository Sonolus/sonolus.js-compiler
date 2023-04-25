import { createCompileESTreeContext } from '../../../estree/compile/context.js'
import { compileForOf } from '../../../estree/compile/utils/forOf.js'
import { hasIntrinsicIterate } from '../../../intrinsic/has.js'
import { Intrinsic } from '../../../intrinsic/index.js'
import { ForOf } from '../../nodes/ForOf.js'
import { TransformIR } from './index.js'
import { isConstant, rewriteAsExecute, transformIRAndGet } from './utils.js'

export const transformForOf: TransformIR<ForOf> = (ir, ctx) => {
    const value = transformIRAndGet(ir.value, ctx)
    const newIR = { ...ir, value }

    const result = isConstant(value)
    if (!result) return newIR

    const estreeCtx = createCompileESTreeContext(
        newIR.stackTraces,
        newIR.thisValue,
        newIR.prototype,
        newIR.env,
    )

    if (hasIntrinsicIterate(result.value))
        return rewriteAsExecute(newIR, ctx, [
            value,
            result.value[Intrinsic.Iterate](newIR, result.value, estreeCtx, ctx),
            ctx.zero(newIR),
        ])

    if (!isIterable(result.value)) return newIR

    return rewriteAsExecute(newIR, ctx, [
        value,
        compileForOf(
            newIR.node,
            [...result.value].map((v) => ctx.value(value, v)),
            estreeCtx,
        ),
        ctx.zero(newIR),
    ])
}

const isIterable = (value: unknown): value is Iterable<unknown> =>
    value !== undefined && value !== null && (value as never)[Symbol.iterator]
