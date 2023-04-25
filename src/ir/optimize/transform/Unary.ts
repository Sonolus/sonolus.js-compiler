import { Unary, UnaryOperator } from '../../nodes/Unary.js'
import { TransformIR } from './index.js'
import { isConstant, rewriteAsExecute, transformIRAndGet } from './utils.js'

export const transformUnary: TransformIR<Unary> = (ir, ctx) => {
    const arg = transformIRAndGet(ir.arg, ctx)
    const newIR = { ...ir, arg }

    const result = isConstant(arg)
    if (!result) return newIR

    const operation = operations[newIR.operator]

    return rewriteAsExecute(newIR, ctx, [arg, ctx.value(newIR, operation(result.value))])
}

const operations: Record<UnaryOperator, (arg: unknown) => unknown> = {
    '-': (arg) => -(arg as never),
    '+': (arg) => +(arg as never),
    '!': (arg) => !arg,
    '~': (arg) => ~(arg as never),
    typeof: (arg) => typeof arg,
}
