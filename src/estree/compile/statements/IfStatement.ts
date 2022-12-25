import { IfStatement } from 'estree'
import { compileESTree, CompileESTree } from '../index.js'

export const compileIfStatement: CompileESTree<IfStatement> = (node, ctx) => {
    const test = compileESTree(node.test, ctx)
    const consequent = compileESTree(node.consequent, ctx)

    return ctx.Execute(node, {
        children: [
            node.alternate
                ? ctx.Conditional(node, {
                      test,
                      consequent,
                      alternate: compileESTree(node.alternate, ctx),
                  })
                : ctx.Logical(node, {
                      operator: '&&',
                      lhs: test,
                      rhs: consequent,
                  }),
            ctx.zero(node),
        ],
    })
}
