import { NewExpression } from 'estree'
import { compileESTree, CompileESTree } from '../index.js'
import { compileCallArgs } from '../utils/call.js'

export const compileNewExpression: CompileESTree<NewExpression> = (node, ctx) =>
    ctx.New(node, {
        callee: compileESTree(node.callee, ctx),
        args: compileCallArgs(node, ctx),
    })
