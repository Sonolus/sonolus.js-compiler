import { ReturnStatement } from 'estree'
import { compileESTree, CompileESTree } from '../index.js'

export const compileReturnStatement: CompileESTree<ReturnStatement> = (node, ctx) =>
    ctx.goto('return', node, node.argument ? compileESTree(node.argument, ctx) : ctx.zero(node))
