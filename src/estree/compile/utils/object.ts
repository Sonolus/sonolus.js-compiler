import { Expression, PrivateIdentifier } from 'estree'
import { IR } from '../../../ir/nodes/index.js'
import { CompileESTreeContext } from '../context.js'
import { compileESTree } from '../index.js'

export const compileObjectKey = (
    key: Expression | PrivateIdentifier,
    computed: boolean,
    ctx: CompileESTreeContext,
): IR => {
    if (computed) return compileESTree(key, ctx)

    switch (key.type) {
        case 'Literal':
            return ctx.value(key, key.value)
        case 'Identifier':
            return ctx.value(key, key.name)
        default:
            throw ctx.error(key, `${key.type} is not supported`)
    }
}
