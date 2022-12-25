import { SequenceExpression } from 'estree'
import { compileESTree, CompileESTree } from '../index.js'

export const compileSequenceExpression: CompileESTree<SequenceExpression> = (node, ctx) =>
    ctx.Execute(node, {
        children: node.expressions.map((expression) => compileESTree(expression, ctx)),
    })
