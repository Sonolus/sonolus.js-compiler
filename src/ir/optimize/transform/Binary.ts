import { Binary, BinaryOperator } from '../../nodes/Binary.js'
import { TransformIR } from './index.js'
import { isConstant, rewriteAsExecute, transformIRAndGet } from './utils.js'

export const transformBinary: TransformIR<Binary> = (ir, ctx) => {
    const lhs = transformIRAndGet(ir.lhs, ctx)
    const rhs = transformIRAndGet(ir.rhs, ctx)

    const lhsResult = isConstant(lhs)
    const rhsResult = isConstant(rhs)
    if (!lhsResult || !rhsResult) return { ...ir, lhs, rhs }

    const operation = operations[ir.operator]

    return rewriteAsExecute(ir, ctx, [
        lhs,
        rhs,
        ctx.value(ir, operation(lhsResult.value, rhsResult.value)),
    ])
}

const operations: Record<BinaryOperator, (lhs: unknown, rhs: unknown) => unknown> = {
    '==': (lhs, rhs) => lhs == rhs,
    '!=': (lhs, rhs) => lhs != rhs,
    '===': (lhs, rhs) => lhs === rhs,
    '!==': (lhs, rhs) => lhs !== rhs,
    '<': (lhs, rhs) => (lhs as never) < (rhs as never),
    '<=': (lhs, rhs) => (lhs as never) <= (rhs as never),
    '>': (lhs, rhs) => (lhs as never) > (rhs as never),
    '>=': (lhs, rhs) => (lhs as never) >= (rhs as never),
    '<<': (lhs, rhs) => (lhs as never) << (rhs as never),
    '>>': (lhs, rhs) => (lhs as never) >> (rhs as never),
    '>>>': (lhs, rhs) => (lhs as never) >>> (rhs as never),
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    '+': (lhs, rhs) => (lhs as never) + rhs,
    '-': (lhs, rhs) => (lhs as never) - (rhs as never),
    '*': (lhs, rhs) => (lhs as never) * (rhs as never),
    '/': (lhs, rhs) => (lhs as never) / (rhs as never),
    '%': (lhs, rhs) => (lhs as never) % (rhs as never),
    '**': (lhs, rhs) => (lhs as never) ** (rhs as never),
    '|': (lhs, rhs) => (lhs as never) | (rhs as never),
    '^': (lhs, rhs) => (lhs as never) ^ (rhs as never),
    '&': (lhs, rhs) => (lhs as never) & (rhs as never),
    in: (lhs, rhs) => (lhs as never) in (rhs as never),
    instanceof: (lhs, rhs) => lhs instanceof (rhs as never),
}
