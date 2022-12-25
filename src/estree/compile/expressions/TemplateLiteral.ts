import { TemplateLiteral } from 'estree'
import { IR } from '../../../ir/nodes/index.js'
import { CompileESTree, compileESTree } from '../index.js'

export const compileTemplateLiteral: CompileESTree<TemplateLiteral> = (node, ctx) => {
    const quasis = node.quasis.map((quasi) => {
        if (typeof quasi.value.cooked !== 'string') throw ctx.error(quasi, 'Unsupported value')

        return ctx.value(quasi, quasi.value.cooked)
    })
    const expressions = node.expressions.map((expression) => compileESTree(expression, ctx))

    let ir: IR = quasis[0]

    for (let i = 0; i < expressions.length; i++) {
        ir = ctx.Binary(node, {
            operator: '+',
            lhs: ctx.Binary(node, {
                operator: '+',
                lhs: ir,
                rhs: expressions[i],
            }),
            rhs: quasis[i + 1],
        })
    }

    return ir
}
