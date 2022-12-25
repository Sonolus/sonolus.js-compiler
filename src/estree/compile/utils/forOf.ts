import { ForOfStatement, Pattern, VariableDeclaration } from 'estree'
import { IR } from '../../../ir/nodes/index.js'
import { CompileESTreeContext } from '../context.js'
import { compileESTree } from '../index.js'
import { assignPattern } from './patterns/assign.js'
import { bindPattern } from './patterns/bind.js'

export const compileForOf = (node: ForOfStatement, values: IR[], ctx: CompileESTreeContext): IR =>
    ctx.lexical(() =>
        ctx.break(node, () =>
            ctx.Execute(node, {
                children: values.map((value) =>
                    ctx.Execute(node, {
                        children: [
                            ...compileForOfBindings(node.left, value, ctx),
                            ctx.continue(node, () => compileESTree(node.body, ctx)),
                        ],
                    }),
                ),
            }),
        ),
    )

export const compileForOfBindings = (
    node: VariableDeclaration | Pattern,
    value: IR,
    ctx: CompileESTreeContext,
): IR[] =>
    node.type === 'VariableDeclaration'
        ? node.declarations.flatMap((declaration) => bindPattern(declaration.id, value, ctx))
        : assignPattern(node, value, ctx)
