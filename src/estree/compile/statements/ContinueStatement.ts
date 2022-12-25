import { ContinueStatement } from 'estree'
import { CompileESTree } from '../index.js'

export const compileContinueStatement: CompileESTree<ContinueStatement> = (node, ctx) => {
    if (node.label) throw ctx.error(node, 'Label is not supported')

    return ctx.goto('continue', node, ctx.zero(node))
}
