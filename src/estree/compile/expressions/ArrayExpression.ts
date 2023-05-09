import { ArrayExpression } from 'estree'
import { IR } from '../../../ir/nodes/index.js'
import { compileESTree, CompileESTree } from '../index.js'

export const compileArrayExpression: CompileESTree<ArrayExpression> = (node, ctx) => {
    const array: unknown[] = []
    const children: IR[] = []

    for (const element of node.elements) {
        if (!element) {
            children.push(
                ctx.ArrayAdd(node, {
                    array,
                    value: ctx.value(node, undefined),
                }),
            )
            continue
        }

        if (element.type === 'SpreadElement') {
            children.push(
                ctx.ArraySpread(node, {
                    array,
                    arg: compileESTree(element.argument, ctx),
                }),
            )
            continue
        }

        children.push(
            ctx.ArrayAdd(element, {
                array,
                value: compileESTree(element, ctx),
            }),
        )
    }

    return ctx.ArrayConstructor(node, {
        array,
        children,
    })
}
