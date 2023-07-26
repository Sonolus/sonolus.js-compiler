import { FunctionExpression } from 'estree'
import { CompileESTree } from '../index.js'

export const compileFunctionExpression: CompileESTree<FunctionExpression> = (node, ctx) => {
    if (node.async) throw ctx.error(node, 'Async is not supported')
    if (node.generator) throw ctx.error(node, 'Generator is not supported')

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const fn = () => {}

    const source = node.sourceFile.slice(node.start, node.end)
    fn.toString = () => source

    return ctx.value(node, fn)
}
