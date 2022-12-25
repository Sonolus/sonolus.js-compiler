import { SimpleCallExpression } from 'estree'
import { cloneIR } from '../../../ir/clone/index.js'
import { compileESTree, CompileESTree } from '../index.js'
import { compileCallArgs } from '../utils/call.js'

export const compileCallExpression: CompileESTree<SimpleCallExpression> = (node, ctx) => {
    if (node.callee.type === 'Super') {
        const args = compileCallArgs(node, ctx)

        return ctx.Super(node, {
            instance: ctx.thisValue as object,
            prototype: ctx.prototype,
            args,
        })
    }

    const callee = compileESTree(node.callee, ctx)
    const args = compileCallArgs(node, ctx)

    if (node.optional)
        return ctx.Logical(node, {
            operator: '&&',
            lhs: callee,
            rhs: ctx.Call(node, {
                callee: cloneIR(callee),
                args,
            }),
        })

    return ctx.Call(node, {
        callee,
        args,
    })
}
