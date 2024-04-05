import { RuntimeFunction } from '@sonolus/core'
import { Logical, LogicalOperator } from '../nodes/Logical.js'
import { CompileIR } from './index.js'

const operations: Partial<Record<LogicalOperator, RuntimeFunction>> = {
    '||': 'Or',
    '&&': 'And',
}

export const compileLogical: CompileIR<Logical> = (ir, ctx) => {
    const func = operations[ir.operator]
    if (!func) throw ctx.error(ir, `Operation '${ir.operator}' must be resolved at compile time`)

    return ctx.func(func, ir.lhs, ir.rhs)
}
