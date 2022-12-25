import { Literal } from 'estree'
import { CompileESTree } from './index.js'

export const compileLiteral: CompileESTree<Literal> = (node, ctx) => ctx.value(node, node.value)
