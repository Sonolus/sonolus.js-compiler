import { Identifier } from 'estree'
import { CompileESTree } from './index.js'

export const compileIdentifier: CompileESTree<Identifier> = (node, ctx) =>
    ctx.Reference(node, {
        name: node.name,
    })
