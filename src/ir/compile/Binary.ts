import { RuntimeFunction } from 'sonolus-core'
import { Binary, BinaryOperator } from '../nodes/Binary.js'
import { CompileIR } from './index.js'

const operations: Partial<Record<BinaryOperator, RuntimeFunction>> = {
    '==': 'Equal',
    '!=': 'NotEqual',
    '===': 'Equal',
    '!==': 'NotEqual',
    '<': 'Less',
    '<=': 'LessOr',
    '>': 'Greater',
    '>=': 'GreaterOr',
    '+': 'Add',
    '-': 'Subtract',
    '*': 'Multiply',
    '/': 'Divide',
    '%': 'Rem',
    '**': 'Power',
}

export const compileBinary: CompileIR<Binary> = (ir, ctx) => {
    const func = operations[ir.operator]
    if (!func) throw ctx.error(ir, `Operation '${ir.operator}' must be resolved at compile time`)

    return ctx.func(func, ir.lhs, ir.rhs)
}
