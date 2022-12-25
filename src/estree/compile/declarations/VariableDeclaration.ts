import { VariableDeclaration, VariableDeclarator } from 'estree'
import { CompileESTreeContext } from '../context.js'
import { CompileESTree, compileESTree } from '../index.js'
import { bindPattern } from '../utils/patterns/bind.js'

export const compileVariableDeclaration: CompileESTree<VariableDeclaration> = (node, ctx) => {
    if (node.kind !== 'const' && node.kind !== 'let')
        throw ctx.error(node, `${node.kind} is not supported`)

    return ctx.Execute(node, {
        children: [
            ...node.declarations.flatMap((declaration) =>
                compileVariableDeclarator(declaration, ctx),
            ),
            ctx.zero(node),
        ],
    })
}

const compileVariableDeclarator = (node: VariableDeclarator, ctx: CompileESTreeContext) => {
    if (!node.init) throw ctx.error(node, 'Variable must be initialized on declaration')

    return bindPattern(node.id, compileESTree(node.init, ctx), ctx)
}
