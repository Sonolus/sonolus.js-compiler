import { CallExpression } from 'estree'
import { IR } from '../../../ir/nodes/index.js'
import { CompileESTreeContext } from '../context.js'
import { compileESTree } from '../index.js'

export const compileCallArgs = (
    node: CallExpression,
    ctx: CompileESTreeContext,
): { init: IR; value: unknown[] } => {
    const array: unknown[] = []

    const inits: IR[] = []

    for (const argument of node.arguments) {
        if (argument.type === 'SpreadElement') {
            inits.push(
                ctx.ArraySpread(argument, {
                    array,
                    arg: compileESTree(argument.argument, ctx),
                }),
            )
            continue
        }

        inits.push(
            ctx.ArrayAdd(argument, {
                array,
                value: compileESTree(argument, ctx),
            }),
        )
    }

    return {
        init: ctx.Execute(node, {
            children: [...inits, ctx.zero(node)],
        }),
        value: array,
    }
}
