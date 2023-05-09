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
            if (!hasIntrinsicGet(ir.value)) break

            return ir.value[Intrinsic.Get](ir, ctx)
    }

    return ir
}

export const isConstant = (ir: IR): Value | undefined => {
    switch (ir.type) {
        case 'Execute':
            return isConstant(ir.children[ir.children.length - 1])
        case 'Value':
            return ir
    }
}

export const isReference = (ir: IR): Value | undefined => {
    switch (ir.type) {
        case 'Execute':
            return isReference(ir.children[ir.children.length - 1])
        case 'Value':
            if (typeof ir.value === 'number' || typeof ir.value === 'boolean') return

            return ir
    }
}
