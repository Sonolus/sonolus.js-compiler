import { Node, Pattern } from 'estree'
import { IR } from '../../../ir/nodes/index.js'
import { CompileESTreeContext } from '../context.js'
import { compileESTree } from '../index.js'
import { bindPattern } from './patterns/bind.js'

export const compileFunctionCall = (
    node: Node,
    params: Pattern[],
    body: Node,
    args: unknown[],
    ctx: CompileESTreeContext,
): IR[] =>
    ctx.lexical(() => [
        ...bindFunctionParameters(node, params, ctx.value(node, args), ctx),
        ctx.return(body, () => compileESTree(body, ctx)),
    ])

const bindFunctionParameters = (
    node: Node,
    parameters: Pattern[],
    value: IR,
    ctx: CompileESTreeContext,
) => {
    const elements: [string, unknown][] = []

    const destructs: IR[] = []

    for (const parameter of parameters) {
        if (parameter.type === 'RestElement') {
            const restValue = ctx.ArrayDestructorRest(parameter, {
                elements,
            })

            destructs.push(...bindPattern(parameter.argument, restValue, ctx))
            continue
        }

        const elementValue = ctx.ArrayDestructorGet(parameter, {
            elements,
        })

        destructs.push(...bindPattern(parameter, elementValue, ctx))
    }

    return [
        ctx.ArrayDestructor(node, {
            array: value,
            elements,
        }),
        ...destructs,
    ]
}
