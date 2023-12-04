import { ExpressionStatement } from 'estree'
import { createCompileESTreeContext } from '../../../../estree/compile/context.js'
import { compileESTree } from '../../../../estree/compile/index.js'
import { createCompileIRContext } from '../../../../ir/compile/context.js'
import { compileIR } from '../../../../ir/compile/index.js'
import { optimizeIR } from '../../../../ir/optimize/index.js'
import { compileJS } from '../../../../js/compile/index.js'
import { Callback } from '../../../../lib/watch/enums/Callback.js'
import { SNode } from '../../../../snode/nodes/index.js'
import { optimizeSNode } from '../../../../snode/optimize/index.js'

export const buildCallback = (
    fn: () => number,
    callback: Callback,
    optimizationLevel: 'low' | 'high',
    globalResolver: (name: string) => unknown,
): SNode | undefined => {
    const wrapper = { [callback]: fn }
    const wrapperName = `_${Math.ceil(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)}`

    const js = `\n${wrapperName}.${callback}()\n`
    const program = compileJS(js)
    const node = (program.body[0] as ExpressionStatement).expression

    const estreeCtx = createCompileESTreeContext([], undefined, undefined, {
        callback,
        lexical: {
            get: (name) => {
                if (name === wrapperName) return wrapper

                return globalResolver(name)
            },
            set: (ir, _name, _value, ctx) => {
                throw ctx.error(ir, 'Cannot mutate global lexical scope')
            },
        },
    })
    const ir = optimizeIR(compileESTree(node, estreeCtx), optimizationLevel)

    const irCtx = createCompileIRContext()
    const snode = optimizeSNode(compileIR(ir, irCtx))

    if (typeof snode === 'number' && snode === 0) return

    return snode
}
