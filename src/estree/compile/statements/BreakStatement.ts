import { BreakStatement } from 'estree'
import { CompileESTree } from '../index.js'

export const compileBreakStatement: CompileESTree<BreakStatement> = (node, ctx) => {
    if (node.label) throw ctx.error(node, 'Label is not supported')

    return ctx.goto('break', node, ctx.zero(node))
}
