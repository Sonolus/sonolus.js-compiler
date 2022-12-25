import { RuntimeFunction } from 'sonolus-core'
import { Unary, UnaryOperator } from '../nodes/Unary.js'
import { CompileIR } from './index.js'

const operations: Partial<Record<UnaryOperator, RuntimeFunction>> = {
    '-': 'Negate',
    '!': 'Not',
}

export const compileUnary: CompileIR<Unary> = (ir, ctx) => {
    const func = operations[ir.operator]
    if (!func) throw ctx.error(ir, `Operation '${ir.operator}' must be resolved at compile time`)

    return ctx.func(func, ir.arg)
}
