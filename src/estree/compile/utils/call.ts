import { CallExpression } from 'estree'
import { IR } from '../../../ir/nodes/index.js'
import { CompileESTreeContext } from '../context.js'
import { compileESTree } from '../index.js'

export const compileCallArgs = (node: CallExpression, ctx: CompileESTreeContext): IR => {
    const array: unknown[] = []
    const children: IR[] = []

    for (const argument of node.arguments) {
        if (argument.type === 'SpreadElement') {
            children.push(
                ctx.ArraySpread(argument, {
                    array,
                    arg: compileESTree(argument.argument, ctx),
                }),
            )
            continue
        }

        children.push(
            ctx.ArrayAdd(argument, {
                array,
                value: compileESTree(argument, ctx),
            }),
        )
    }

    return ctx.ArrayConstructor(node, {
        array,
        children,
    })
}
