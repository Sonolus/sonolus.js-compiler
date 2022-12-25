import { mapIR } from '../../map/index.js'
import { Binary, BinaryOperator } from '../../nodes/Binary.js'
import { TransformIR } from './index.js'
import { isConstant, rewriteAsExecute, transformIRAndGet } from './utils.js'

export const transformBinary: TransformIR<Binary> = (ir, ctx) => {
    const lhs = transformIRAndGet(ir.lhs, ctx)
    const rhs = transformIRAndGet(ir.rhs, ctx)
    const newIR = mapIR(ir, lhs, rhs)

    const lhsResult = isConstant(lhs)
    const rhsResult = isConstant(rhs)
    if (!lhsResult || !rhsResult) return newIR

    const operation = operations[newIR.operator]

    return rewriteAsExecute(newIR, ctx, [
        lhs,
        rhs,
        ctx.value(newIR, operation(lhsResult.value, rhsResult.value)),
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
