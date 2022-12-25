import { ForStatement } from 'estree'
import { CompileESTree, compileESTree } from '../index.js'

export const compileForStatement: CompileESTree<ForStatement> = (node, ctx) =>
    ctx.lexical(() =>
        ctx.break(node, () =>
            ctx.Execute(node, {
                children: [
                    node.init ? compileESTree(node.init, ctx) : ctx.zero(node),
                    ctx.While(node, {
                        test: node.test ? compileESTree(node.test, ctx) : ctx.value(node, true),
                        body: ctx.Execute(node, {
                            children: [
                                ctx.continue(node, () => compileESTree(node.body, ctx)),
                                node.update ? compileESTree(node.update, ctx) : ctx.zero(node),
                                ctx.zero(node),
                            ],
                        }),
                    }),
                ],
            }),
        ),
    )
