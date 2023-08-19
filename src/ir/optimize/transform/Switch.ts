import { Switch } from '../../nodes/Switch.js'
import { TransformIR, transformIR } from './index.js'
import { rewriteAsExecute, transformIRAndGet } from './utils.js'

export const transformSwitch: TransformIR<Switch> = (ir, ctx) => {
    const discriminant = transformIRAndGet(ir.discriminant, ctx)
    const defaultCase = transformIRAndGet(ir.defaultCase, ctx)
    const cases = ir.cases.map(({ test, consequent }) => ({
        test: transformIRAndGet(test, ctx),
        consequent: transformIRAndGet(consequent, ctx),
    }))

    switch (cases.length) {
        case 0:
            return rewriteAsExecute(ir, ctx, [discriminant, defaultCase])
        case 1:
            return transformIR(
                ctx.Conditional(ir, {
                    test: ctx.Binary(ir, {
                        operator: '===',
                        lhs: discriminant,
                        rhs: cases[0].test,
                    }),
                    consequent: cases[0].consequent,
                    alternate: defaultCase,
                }),
                ctx,
            )
        default:
            return { ...ir, discriminant, defaultCase, cases }
    }
}
