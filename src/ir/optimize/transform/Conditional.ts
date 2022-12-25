import { mapIR } from '../../map/index.js'
import { Conditional } from '../../nodes/Conditional.js'
import { TransformIR } from './index.js'
import { isConstant, transformIRAndGet } from './utils.js'

export const transformConditional: TransformIR<Conditional> = (ir, ctx) => {
    const test = transformIRAndGet(ir.test, ctx)
    const consequent = transformIRAndGet(ir.consequent, ctx)
    const alternate = transformIRAndGet(ir.alternate, ctx)

    const result = isConstant(test)
    if (!result) return mapIR(ir, test, consequent, alternate)

    return result.value ? consequent : alternate
}
