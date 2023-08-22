import { createCompileESTreeContext } from '../../../../estree/compile/context.js'
import { compileESTree } from '../../../../estree/compile/index.js'
import { createCompileIRContext } from '../../../../ir/compile/context.js'
import { compileIR } from '../../../../ir/compile/index.js'
import { optimizeIR } from '../../../../ir/optimize/index.js'
import { compileJS } from '../../../../js/compile/index.js'
import { Archetype } from '../../../../lib/play/Archetype.js'
import { ArchetypeCallback } from '../../../../lib/preview/enums/ArchetypeCallback.js'
import { SNode } from '../../../../snode/nodes/index.js'
import { optimizeSNode } from '../../../../snode/optimize/index.js'
import { ignoreReturn } from '../../../shared/utils/compile.js'

export const buildArchetypeCallback = (
    archetype: Archetype,
    callback: ArchetypeCallback,
    optimizationLevel: 'low' | 'high',
    globalResolver: (name: string) => unknown,
):
    | {
          order: number
          snode: SNode
      }
    | undefined => {
    const name = `${archetype.name}_${Math.ceil(Math.random() * Number.MAX_SAFE_INTEGER).toString(
        16,
    )}`

    const js = `\n${name}.${callback}()\n`
    const program = compileJS(js)
    const node = program.body[0]

    const estreeCtx = createCompileESTreeContext([], undefined, undefined, {
        callback,
        lexical: {
            get: (n) => {
                if (n === name) return archetype

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

    const result = {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        order: archetype[`${callback}Order` as never] ?? 0,
        snode,
    }

    if (typeof snode === 'number') return

    if (snode.func === 'Execute' && snode.args[snode.args.length - 1] === 0) {
        result.snode = ignoreReturn(snode)
    }

    return result
}
