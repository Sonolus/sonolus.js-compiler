import { ForOfStatement } from 'estree'
import { CompileESTree, compileESTree } from '../index.js'

export const compileForOfStatement: CompileESTree<ForOfStatement> = (node, ctx) => {
    if (node.await) throw ctx.error(node, 'Await is not supported')

    return ctx.ForOf(node, {
        node,
        thisValue: ctx.thisValue,
        prototype: ctx.prototype,
        value: compileESTree(node.right, ctx),
    })
}
