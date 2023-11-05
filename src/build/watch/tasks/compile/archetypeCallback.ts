import { ExpressionStatement } from 'estree'
import { createCompileESTreeContext } from '../../../../estree/compile/context.js'
import { compileESTree } from '../../../../estree/compile/index.js'
import { createCompileIRContext } from '../../../../ir/compile/context.js'
import { compileIR } from '../../../../ir/compile/index.js'
import { optimizeIR } from '../../../../ir/optimize/index.js'
import { compileJS } from '../../../../js/compile/index.js'
import { Archetype } from '../../../../lib/watch/Archetype.js'
import { Callback } from '../../../../lib/watch/enums/Callback.js'
import { SNode } from '../../../../snode/nodes/index.js'
import { optimizeSNode } from '../../../../snode/optimize/index.js'
import { ignoreReturn } from '../../../shared/utils/compile.js'

export const buildArchetypeCallback = (
    archetype: Archetype,
    callback: Callback,
    optimizationLevel: 'low' | 'high',
    globalResolver: (name: string) => unknown,
):
    | {
          order: number
          snode: SNode
      }
    | undefined => {
    const name = JSON.stringify(archetype.name)

    const wrapper = { [archetype.name]: archetype }
    const wrapperName = `_${Math.ceil(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)}`

    const js = `\n${wrapperName}[${name}].${callback}()\n`
    const program = compileJS(js)
    const node =
        callback === 'spawnTime' || callback === 'despawnTime'
            ? (program.body[0] as ExpressionStatement).expression
            : program.body[0]

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

    const result = {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        order: archetype[`${callback}Order` as never] ?? 0,
        snode,
    }

    switch (callback) {
        case 'spawnTime':
        case 'despawnTime':
            if (typeof snode === 'number' && snode === 0) return
            break
        default:
            if (typeof snode === 'number') return

            if (snode.func === 'Execute' && snode.args[snode.args.length - 1] === 0) {
                result.snode = ignoreReturn(snode)
            }

            break
    }

    return result
}
