import { EmptyStatement } from 'estree'
import { CompileESTree } from '../index.js'

export const compileEmptyStatement: CompileESTree<EmptyStatement> = (node, ctx) => ctx.zero(node)
