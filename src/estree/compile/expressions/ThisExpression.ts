import { ThisExpression } from 'estree'
import { CompileESTree } from '../index.js'

export const compileThisExpression: CompileESTree<ThisExpression> = (node, ctx) =>
    ctx.value(node, ctx.thisValue)
