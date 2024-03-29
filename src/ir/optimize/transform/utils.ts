import { hasIntrinsicGet } from '../../../intrinsic/has.js'
import { Intrinsic } from '../../../intrinsic/index.js'
import { Value } from '../../nodes/Value.js'
import { IR } from '../../nodes/index.js'
import { TransformIRContext } from './context.js'
import { transformIR } from './index.js'

export const rewriteAsExecute = (ir: IR, ctx: TransformIRContext, children: IR[]): IR =>
    transformIR(
        ctx.Execute(ir, {
            children,
        }),
        ctx,
    )

export const transformIRAndGet = (ir: IR, ctx: TransformIRContext): IR =>
    transformIR(unwrapIRGet(transformIR(ir, ctx), ctx), ctx)

export const unwrapIRGet = (ir: IR, ctx: TransformIRContext): IR => {
    switch (ir.type) {
        case 'Execute':
            return ctx.Execute(ir, {
                children: [
                    ...ir.children.slice(0, -1),
                    unwrapIRGet(ir.children[ir.children.length - 1], ctx),
                ],
            })
        case 'Value':
            if (!hasIntrinsicGet(ir.value)) return ir

            return ir.value[Intrinsic.Get](ir, ctx)
        default:
            return ir
    }
}

export const isResolved = (ir: IR): boolean => {
    switch (ir.type) {
        case 'Binary':
        case 'Block':
        case 'Break':
        case 'Conditional':
        case 'Declare':
        case 'DoWhile':
        case 'Execute':
        case 'Get':
        case 'Logical':
        case 'Native':
        case 'Set':
        case 'Unary':
        case 'Value':
        case 'While':
            return true
        default:
            return false
    }
}

export const isConstant = (ir: IR): Value | undefined => {
    switch (ir.type) {
        case 'Execute':
            return isConstant(ir.children[ir.children.length - 1])
        case 'Value':
            return ir
        default:
            return
    }
}

export const isReference = (ir: IR): Value | undefined => {
    switch (ir.type) {
        case 'Execute':
            return isReference(ir.children[ir.children.length - 1])
        case 'Value':
            if (typeof ir.value === 'number' || typeof ir.value === 'boolean') return

            return ir
        default:
            return
    }
}
