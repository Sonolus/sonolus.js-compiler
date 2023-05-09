import { ArrayConstructor } from '../../nodes/ArrayConstructor.js'
import { IR } from '../../nodes/index.js'
import { TransformIR, transformIR } from './index.js'
import { rewriteAsExecute } from './utils.js'

export const transformArrayConstructor: TransformIR<ArrayConstructor> = (ir, ctx) => {
    const children = ir.children.map((child) => transformIR(child, ctx))

    if (!children.every(isResolved)) return { ...ir, children }

    return rewriteAsExecute(ir, ctx, [...children, ctx.value(ir, ir.array)])
}

const isResolved = (ir: IR) => ir.type !== 'ArrayAdd' && ir.type !== 'ArraySpread'
