import { mapIR } from '../../map/index.js'
import { Logical, LogicalOperator } from '../../nodes/Logical.js'
import { TransformIR } from './index.js'
import { isConstant, rewriteAsExecute, transformIRAndGet } from './utils.js'

export const transformLogical: TransformIR<Logical> = (ir, ctx) => {
    const lhs = transformIRAndGet(ir.lhs, ctx)
    const rhs = transformIRAndGet(ir.rhs, ctx)

    const result = isConstant(lhs)
    if (!result) return mapIR(ir, lhs, rhs)

    const operation = operations[ir.operator]
    const value = operation(result.value, {})

    return rewriteAsExecute(ir, ctx, [lhs, value === result.value ? ctx.value(ir, value) : rhs])
}

const operations: Record<LogicalOperator, (lhs: unknown, rhs: unknown) => unknown> = {
    '||': (lhs, rhs) => lhs || rhs,
    '&&': (lhs, rhs) => lhs && rhs,
    '??': (lhs, rhs) => lhs ?? rhs,
}
