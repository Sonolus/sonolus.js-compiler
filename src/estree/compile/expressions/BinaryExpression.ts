import { BinaryExpression } from 'estree'
import { CompileESTree, compileESTree } from '../index.js'

export const compileBinaryExpression: CompileESTree<BinaryExpression> = (node, ctx) => {
    switch (node.operator) {
        case '==':
        case '!=':
        case '===':
        case '!==':
        case '<':
        case '<=':
        case '>':
        case '>=':
        case '<<':
        case '>>':
        case '>>>':
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
        case '**':
        case '|':
        case '^':
        case '&':
        case 'in':
        case 'instanceof':
            break
    }

    return ctx.Binary(node, {
        operator: node.operator,
        lhs: compileESTree(node.left, ctx),
        rhs: compileESTree(node.right, ctx),
    })
}
