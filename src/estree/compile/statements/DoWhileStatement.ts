import { DoWhileStatement } from 'estree'
import { compileESTree, CompileESTree } from '../index.js'

export const compileDoWhileStatement: CompileESTree<DoWhileStatement> = (node, ctx) =>
    ctx.break(node, () =>
        ctx.DoWhile(node, {
            body: ctx.continue(node, () => compileESTree(node.body, ctx)),
            test: compileESTree(node.test, ctx),
        }),
    )
