import { WhileStatement } from 'estree'
import { compileESTree, CompileESTree } from '../index.js'

export const compileWhileStatement: CompileESTree<WhileStatement> = (node, ctx) =>
    ctx.break(node, () =>
        ctx.While(node, {
            test: compileESTree(node.test, ctx),
            body: ctx.continue(node, () => compileESTree(node.body, ctx)),
        }),
    )
