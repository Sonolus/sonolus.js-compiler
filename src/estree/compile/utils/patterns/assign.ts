import { Pattern } from 'estree'
import { IR } from '../../../../ir/nodes/index.js'
import { CompileESTreeContext } from '../../context.js'
import { compileESTree } from '../../index.js'
import { CompileLeaf, compilePattern } from './index.js'

const compileLeaf: CompileLeaf = (node, value, ctx) => {
    switch (node.type) {
        case 'Identifier':
        case 'MemberExpression':
            return [
                ctx.Assign(node, {
                    operator: '=',
                    lhs: compileESTree(node, ctx),
                    rhs: value,
                }),
            ]
        default:
            throw ctx.error(node, `${node.type} is not supported`)
    }
}

export const assignPattern = (node: Pattern, value: IR, ctx: CompileESTreeContext): IR[] =>
    compilePattern(node, value, ctx, compileLeaf)
