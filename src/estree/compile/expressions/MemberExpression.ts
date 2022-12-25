import { MemberExpression } from 'estree'
import { compileESTree, CompileESTree } from '../index.js'
import { compileObjectKey } from '../utils/object.js'

export const compileMemberExpression: CompileESTree<MemberExpression> = (node, ctx) => {
    if (node.optional) throw ctx.error(node, 'Optional is not supported')

    return ctx.Member(node, {
        object: compileESTree(node.object, ctx),
        key: compileObjectKey(node.property, node.computed, ctx),
    })
}
