import { ExpressionStatement } from 'estree'
import { CompileESTree, compileESTree } from '../index.js'

export const compileExpressionStatement: CompileESTree<ExpressionStatement> = (node, ctx) =>
    ctx.Execute(node, {
        children: [compileESTree(node.expression, ctx), ctx.zero(node)],
    })
