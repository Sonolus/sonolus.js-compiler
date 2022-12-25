import { LogicalExpression } from 'estree'
import { compileESTree, CompileESTree } from '../index.js'

export const compileLogicalExpression: CompileESTree<LogicalExpression> = (node, ctx) => {
    switch (node.operator) {
        case '||':
        case '&&':
        case '??':
            break
        default:
            throw ctx.error(node, `Operator ${node.operator} is not supported`)
    }

    return ctx.Logical(node, {
        operator: node.operator,
        lhs: compileESTree(node.left, ctx),
        rhs: compileESTree(node.right, ctx),
    })
}
