import { UpdateExpression } from 'estree'
import { cloneIR } from '../../../ir/clone/index.js'
import { IR } from '../../../ir/nodes/index.js'
import { CompileESTreeContext } from '../context.js'
import { compileESTree, CompileESTree } from '../index.js'

export const compileUpdateExpression: CompileESTree<UpdateExpression> = (node, ctx) => {
    const argument = compileESTree(node.argument, ctx)

    if (node.prefix) return compileAssign(node, argument, ctx)

    const name = `temp:${Math.random()}`

    return ctx.Execute(node, {
        children: [
            ctx.Declare(node, {
                name,
                value: argument,
            }),
            compileAssign(node, cloneIR(argument), ctx),
            ctx.Reference(node, {
                name,
            }),
        ],
    })
}

const compileAssign = (node: UpdateExpression, argument: IR, ctx: CompileESTreeContext) =>
    ctx.Assign(node, {
        operator: node.operator === '++' ? '+=' : '-=',
        lhs: argument,
        rhs: ctx.value(node, 1),
    })
