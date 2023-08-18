import { Switch } from '../../nodes/Switch.js'
import { TransformIR, transformIR } from './index.js'
import { transformIRAndGet } from './utils.js'

export const transformSwitch: TransformIR<Switch> = (ir, ctx) => {
    const discriminant = transformIRAndGet(ir.discriminant, ctx)
    const defaultCase = transformIR(ir.defaultCase, ctx)
    const cases = ir.cases.map(({ test, consequent }) => ({
        test: transformIRAndGet(test, ctx),
        consequent: transformIR(consequent, ctx),
    }))

    return { ...ir, discriminant, defaultCase, cases }
}
