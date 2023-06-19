import { hasIntrinsicGet, hasIntrinsicSet } from '../../../intrinsic/has.js'
import { Intrinsic } from '../../../intrinsic/index.js'
import { Assign } from '../../nodes/Assign.js'
import { TransformIR, transformIR } from './index.js'
import { isConstant, rewriteAsExecute, transformIRAndGet } from './utils.js'

export const transformAssign: TransformIR<Assign> = (ir, ctx) => {
    const lhs = transformIR(ir.lhs, ctx)
    const rhs = transformIRAndGet(ir.rhs, ctx)

    const result = isConstant(lhs)
    if (!result || !hasIntrinsicSet(result.value)) return { ...ir, lhs, rhs }

    if (ir.operator === '=')
        return rewriteAsExecute(ir, ctx, [lhs, result.value[Intrinsic.Set](ir, rhs, ctx)])

    if (!hasIntrinsicGet(result.value)) return { ...ir, lhs, rhs }

    if (ir.operator === '||=' || ir.operator === '&&=' || ir.operator === '??=')
        return rewriteAsExecute(ir, ctx, [
            lhs,
            ctx.Logical(ir, {
                operator: (
                    {
                        '||=': '||',
                        '&&=': '&&',
                        '??=': '??',
                    } as const
                )[ir.operator],
                lhs: result.value[Intrinsic.Get](ir, ctx),
                rhs: result.value[Intrinsic.Set](ir, rhs, ctx),
            }),
        ])

    return rewriteAsExecute(ir, ctx, [
        lhs,
        result.value[Intrinsic.Set](
            ir,
            ctx.Binary(ir, {
                operator: (
                    {
                        '+=': '+',
                        '-=': '-',
                        '*=': '*',
                        '/=': '/',
                        '%=': '%',
                        '**=': '**',
                    } as const
                )[ir.operator],
                lhs: result.value[Intrinsic.Get](ir, ctx),
                rhs,
            }),
            ctx,
        ),
    ])
}
