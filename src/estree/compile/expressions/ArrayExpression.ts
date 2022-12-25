import { ArrayExpression } from 'estree'
import { IR } from '../../../ir/nodes/index.js'
import { compileESTree, CompileESTree } from '../index.js'

export const compileArrayExpression: CompileESTree<ArrayExpression> = (node, ctx) => {
    const array: unknown[] = []

    const inits: IR[] = []

    for (const element of node.elements) {
        if (!element) {
            inits.push(
                ctx.ArrayAdd(node, {
                    array,
                    value: ctx.value(node, undefined),
                }),
            )
            continue
        }

        if (element.type === 'SpreadElement') {
            inits.push(
                ctx.ArraySpread(node, {
                    array,
                    arg: compileESTree(element.argument, ctx),
                }),
            )
            continue
        }

        inits.push(
            ctx.ArrayAdd(element, {
                array,
                value: compileESTree(element, ctx),
            }),
        )
    }

    return ctx.Execute(node, {
        children: [...inits, ctx.value(node, array)],
    })
}
