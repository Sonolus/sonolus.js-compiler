import { Super } from 'estree'
import { CompileESTree } from './index.js'

export const compileSuper: CompileESTree<Super> = (node, ctx) =>
    ctx.value(node, Object.getPrototypeOf(ctx.prototype), ctx.thisValue, true)
