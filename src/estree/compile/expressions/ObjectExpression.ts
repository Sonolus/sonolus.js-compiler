import { ObjectExpression } from 'estree'
import { IR } from '../../../ir/nodes/index.js'
import { CompileESTree, compileESTree } from '../index.js'
import { compileObjectKey } from '../utils/object.js'

export const compileObjectExpression: CompileESTree<ObjectExpression> = (node, ctx) => {
    const object = {}

    const inits: IR[] = []

    for (const property of node.properties) {
        if (property.type === 'SpreadElement') {
            inits.push(
                ctx.ObjectSpread(property, {
                    object,
                    arg: compileESTree(property.argument, ctx),
                }),
            )
            continue
        }

        switch (property.kind) {
            case 'init':
            case 'get':
            case 'set':
                inits.push(
                    ctx.ObjectAdd(property, {
                        object,
                        kind: property.kind,
                        key: compileObjectKey(property.key, property.computed, ctx),
                        value: compileESTree(property.value, ctx),
                    }),
                )
                break
            default:
                throw ctx.error(property, `Property kind ${property.kind} is not supported`)
        }
    }

    return ctx.Execute(node, {
        children: [...inits, ctx.value(node, object)],
    })
}
