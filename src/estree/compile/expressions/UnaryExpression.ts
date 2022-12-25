import { UnaryExpression } from 'estree'
import { compileESTree, CompileESTree } from '../index.js'

export const compileUnaryExpression: CompileESTree<UnaryExpression> = (node, ctx) => {
    switch (node.operator) {
        case '-':
        case '+':
        case '!':
        case '~':
        case 'typeof':
        case 'void':
            break
        default:
            throw ctx.error(node, `Operator ${node.operator} is not supported`)
    }

    const arg = compileESTree(node.argument, ctx)

    if (node.operator === 'void')
        return ctx.Execute(node, {
            children: [arg, ctx.value(node, undefined)],
        })

    return ctx.Unary(node, {
        operator: node.operator,
        arg,
    })
}
