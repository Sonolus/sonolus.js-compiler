import { AssignmentExpression } from 'estree'
import { CompileESTree, compileESTree } from '../index.js'
import { assignPattern } from '../utils/patterns/assign.js'

export const compileAssignmentExpression: CompileESTree<AssignmentExpression> = (node, ctx) => {
    if (node.left.type === 'ArrayPattern' || node.left.type === 'ObjectPattern')
        return compilePatternAssignment(node, ctx)

    switch (node.operator) {
        case '=':
        case '+=':
        case '-=':
        case '*=':
        case '/=':
        case '%=':
        case '**=':
        case '||=':
        case '&&=':
        case '??=':
            break
        default:
            throw ctx.error(node, `Operator ${node.operator} is not supported`)
    }

    return ctx.Assign(node, {
        operator: node.operator,
        lhs: compileESTree(node.left, ctx),
        rhs: compileESTree(node.right, ctx),
    })
}

const compilePatternAssignment: CompileESTree<AssignmentExpression> = (node, ctx) => {
    if (node.operator !== '=') throw ctx.error(node, `Operator ${node.operator} is not supported`)

    const name = `temp:${Math.random()}`

    const value = () =>
        ctx.Reference(node.right, {
            name,
        })

    return ctx.Execute(node, {
        children: [
            ctx.Declare(node.right, {
                name,
                value: compileESTree(node.right, ctx),
            }),
            ...assignPattern(node.left, value(), ctx),
            value(),
        ],
    })
}
