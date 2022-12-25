import { hasIntrinsicGet, hasIntrinsicSet } from '../../../intrinsic/has.js'
import { Intrinsic } from '../../../intrinsic/index.js'
import { mapIR } from '../../map/index.js'
import { Assign } from '../../nodes/Assign.js'
import { TransformIR, transformIR } from './index.js'
import { isConstant, rewriteAsExecute, transformIRAndGet } from './utils.js'

export const transformAssign: TransformIR<Assign> = (ir, ctx) => {
    const lhs = transformIR(ir.lhs, ctx)
    const rhs = transformIRAndGet(ir.rhs, ctx)
    const newIR = mapIR(ir, lhs, rhs)

    const result = isConstant(lhs)
    if (!result || !hasIntrinsicSet(result.value)) return newIR

    if (ir.operator === '=')
        return rewriteAsExecute(newIR, ctx, [lhs, result.value[Intrinsic.Set](newIR, rhs, ctx)])

    if (!result || !hasIntrinsicGet(result.value)) return newIR

    if (ir.operator === '||=' || ir.operator === '&&=' || ir.operator === '??=')
        return rewriteAsExecute(newIR, ctx, [
            lhs,
            ctx.Logical(ir, {
                operator: (
                    {
                        '||=': '||',
                        '&&=': '&&',
                        '??=': '??',
                    } as const
                )[ir.operator],
                lhs: result.value[Intrinsic.Get](newIR, ctx),
                rhs: result.value[Intrinsic.Set](newIR, rhs, ctx),
            }),
        ])

    return rewriteAsExecute(newIR, ctx, [
        lhs,
        result.value[Intrinsic.Set](
            newIR,
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
                lhs: result.value[Intrinsic.Get](newIR, ctx),
                rhs,
            }),
            ctx,
        ),
    ])
}
