import { Unary, UnaryOperator } from '../../nodes/Unary.js'
import { TransformIR } from './index.js'
import { isConstant, rewriteAsExecute, transformIRAndGet } from './utils.js'

export const transformUnary: TransformIR<Unary> = (ir, ctx) => {
    const arg = transformIRAndGet(ir.arg, ctx)

    const result = isConstant(arg)
    if (!result) return { ...ir, arg }

    const operation = operations[ir.operator]

    return rewriteAsExecute(ir, ctx, [arg, ctx.value(ir, operation(result.value))])
}

const operations: Record<UnaryOperator, (arg: unknown) => unknown> = {
    '-': (arg) => -(arg as never),
    '+': (arg) => +(arg as never),
    '!': (arg) => !arg,
    '~': (arg) => ~(arg as never),
    typeof: (arg) => typeof arg,
}
