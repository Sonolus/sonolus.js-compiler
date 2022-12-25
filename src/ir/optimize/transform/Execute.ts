import { sideEffectFreeFuncs } from '../../../utils/funcs.js'
import { mapIR } from '../../map/index.js'
import { Execute } from '../../nodes/Execute.js'
import { IR } from '../../nodes/index.js'
import { TransformIRContext } from './context.js'
import { transformIR, TransformIR } from './index.js'
import { rewriteAsExecute } from './utils.js'

export const transformExecute: TransformIR<Execute> = (ir, ctx) => {
    const children = ir.children
        .map((child) => transformIR(child, ctx))
        .map((child, i, children) => expand(child, i === children.length - 1, ctx))
        .flat()

    const cutOffIndex = children.findIndex(
        (child) => child.type === 'Break' || child.type === 'Throw',
    )
    if (cutOffIndex !== -1) {
        children.length = cutOffIndex + 1
    }

    if (children.length === 0) return ctx.zero(ir)
    if (children.length === 1) return children[0]

    return mapIR(ir, ...children)
}

const expand = (ir: IR, shouldPreserve: boolean, ctx: TransformIRContext) =>
    shouldPreserve ? expandPreserve(ir) : expandDiscard(ir, ctx)

const expandPreserve = (ir: IR): IR[] => {
    switch (ir.type) {
        case 'Execute':
            return ir.children
        default:
            return [ir]
    }
}

const expandDiscard = (ir: IR, ctx: TransformIRContext): IR[] => {
    switch (ir.type) {
        case 'Binary':
            return [ir.lhs, ir.rhs].flatMap((ir) => expandDiscard(ir, ctx))
        case 'Conditional':
            return [
                ctx.Conditional(ir, {
                    test: ir.test,
                    consequent: rewriteAsExecute(ir, ctx, expandDiscard(ir.consequent, ctx)),
                    alternate: rewriteAsExecute(ir, ctx, expandDiscard(ir.alternate, ctx)),
                }),
            ]
        case 'Execute':
            return ir.children.flatMap((ir) => expandDiscard(ir, ctx))
        case 'Logical':
            return [
                ctx.Logical(ir, {
                    operator: ir.operator,
                    lhs: ir.lhs,
                    rhs: rewriteAsExecute(ir, ctx, expandDiscard(ir.rhs, ctx)),
                }),
            ]
        case 'Native':
            if (!sideEffectFreeFuncs.includes(ir.func)) return [ir]

            return ir.args.flatMap((ir) => expandDiscard(ir, ctx))
        case 'Unary':
            return expandDiscard(ir.arg, ctx)
        case 'Get':
        case 'Member':
        case 'Reference':
        case 'Value':
            return []
        default:
            return [ir]
    }
}
