import { Switch } from '../../nodes/Switch.js'
import { IR } from '../../nodes/index.js'
import { TransformIR, transformIR } from './index.js'
import { isConstant, rewriteAsExecute, transformIRAndGet } from './utils.js'

export const transformSwitch: TransformIR<Switch> = (ir, ctx) => {
    const discriminant = transformIRAndGet(ir.discriminant, ctx)

    const discriminantResult = isConstant(discriminant)

    let prepend: IR | undefined
    const cases: {
        test: IR
        consequent: IR
    }[] = []

    for (const switchCase of ir.cases) {
        const test = prepend
            ? rewriteAsExecute(switchCase.test, ctx, [
                  prepend,
                  transformIRAndGet(switchCase.test, ctx),
              ])
            : transformIRAndGet(switchCase.test, ctx)
        prepend = undefined

        if (discriminantResult) {
            const testResult = isConstant(test)
            if (testResult) {
                if (discriminantResult.value === testResult.value) {
                    prepend = rewriteAsExecute(ir, ctx, [discriminant, test, switchCase.consequent])
                    break
                }

                prepend = test
                continue
            }
        }

        cases.push({
            test,
            consequent: transformIR(switchCase.consequent, ctx),
        })
    }

    const defaultCase = prepend
        ? rewriteAsExecute(ir.defaultCase, ctx, [prepend, ir.defaultCase])
        : transformIR(ir.defaultCase, ctx)

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
