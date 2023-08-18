import { LogicalExpression } from 'estree'
import { compileESTree, CompileESTree } from '../index.js'

export const compileLogicalExpression: CompileESTree<LogicalExpression> = (node, ctx) => {
    switch (node.operator) {
        case '||':
        case '&&':
        case '??':
            break
    }

    return ctx.Logical(node, {
        operator: node.operator,
        lhs: compileESTree(node.left, ctx),
        rhs: compileESTree(node.right, ctx),
    })
}
