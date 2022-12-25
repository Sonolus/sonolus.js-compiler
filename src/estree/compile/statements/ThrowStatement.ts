import { ThrowStatement } from 'estree'
import { CompileESTree, compileESTree } from '../index.js'

export const compileThrowStatement: CompileESTree<ThrowStatement> = (node, ctx) =>
    ctx.Throw(node, {
        arg: compileESTree(node.argument, ctx),
    })
