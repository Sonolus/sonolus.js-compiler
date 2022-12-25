import { BlockStatement } from 'estree'
import { compileESTree, CompileESTree } from '../index.js'

export const compileBlockStatement: CompileESTree<BlockStatement> = (node, ctx) =>
    ctx.lexical(() =>
        ctx.Execute(node, {
            children: [...node.body.map((node) => compileESTree(node, ctx)), ctx.zero(node)],
        }),
    )
