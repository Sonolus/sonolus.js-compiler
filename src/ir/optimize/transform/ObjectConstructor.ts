import { ObjectConstructor } from '../../nodes/ObjectConstructor.js'
import { IR } from '../../nodes/index.js'
import { TransformIR, transformIR } from './index.js'
import { rewriteAsExecute } from './utils.js'

export const transformObjectConstructor: TransformIR<ObjectConstructor> = (ir, ctx) => {
    const children = ir.children.map((child) => transformIR(child, ctx))

    if (!children.every(isResolved)) return { ...ir, children }

    return rewriteAsExecute(ir, ctx, [...children, ctx.value(ir, ir.object)])
}

const isResolved = (ir: IR) => ir.type !== 'ObjectAdd' && ir.type !== 'ObjectSpread'
