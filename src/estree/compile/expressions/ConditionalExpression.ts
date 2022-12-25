import { ConditionalExpression } from 'estree'
import { compileESTree, CompileESTree } from '../index.js'

export const compileConditionalExpression: CompileESTree<ConditionalExpression> = (node, ctx) =>
    ctx.Conditional(node, {
        test: compileESTree(node.test, ctx),
        consequent: compileESTree(node.consequent, ctx),
        alternate: compileESTree(node.alternate, ctx),
    })
