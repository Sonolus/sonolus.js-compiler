import { ExpressionStatement } from 'estree'
import { createCompileESTreeContext } from '../../../../estree/compile/context.js'
import { compileESTree } from '../../../../estree/compile/index.js'
import { createCompileIRContext } from '../../../../ir/compile/context.js'
import { compileIR } from '../../../../ir/compile/index.js'
import { optimizeIR } from '../../../../ir/optimize/index.js'
import { compileJS } from '../../../../js/compile/index.js'
import { TutorialCallback } from '../../../../lib/tutorial/index.js'
import { SNode } from '../../../../snode/nodes/index.js'
import { optimizeSNode } from '../../../../snode/optimize/index.js'
import { ignoreReturn } from '../../../shared/utils/compile.js'

export const buildArchetypeCallback = (
    tutorial: Record<TutorialCallback, () => void>,
    callback: TutorialCallback,
    optimizationLevel: 'low' | 'high',
    globalResolver: (name: string) => unknown,
): SNode | undefined => {
    const name = `Tutorial_${Math.ceil(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)}`

    const js = `\n${name}.${callback}()\n`
    const program = compileJS(js)
    const node = (program.body[0] as ExpressionStatement).expression

    const estreeCtx = createCompileESTreeContext([], undefined, undefined, {
        callback,
        lexical: {
            get: (n) => {
                if (n === name) return tutorial

                return globalResolver(n)
            },
            set: (ir, _name, _value, ctx) => {
                throw ctx.error(ir, 'Cannot mutate global lexical scope')
            },
        },
    })
    const ir = optimizeIR(compileESTree(node, estreeCtx), optimizationLevel)

    const irCtx = createCompileIRContext()
    const snode = optimizeSNode(compileIR(ir, irCtx))

    if (typeof snode === 'number') return

    if (snode.func === 'Execute' && snode.args[snode.args.length - 1] === 0)
        return ignoreReturn(snode)

    return snode
}
