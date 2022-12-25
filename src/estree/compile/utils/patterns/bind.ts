import { Pattern } from 'estree'
import { IR } from '../../../../ir/nodes/index.js'
import { CompileESTreeContext } from '../../context.js'
import { CompileLeaf, compilePattern } from './index.js'

const compileLeaf: CompileLeaf = (node, value, ctx) => {
    switch (node.type) {
        case 'Identifier':
            return [
                ctx.Declare(node, {
                    name: node.name,
                    value,
                }),
            ]
        default:
            throw ctx.error(node, `${node.type} is not supported`)
    }
}

export const bindPattern = (node: Pattern, value: IR, ctx: CompileESTreeContext): IR[] =>
    compilePattern(node, value, ctx, compileLeaf)
