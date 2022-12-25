import { ExpressionStatement } from 'estree'
import { createCompileESTreeContext } from '../../../estree/compile/context.js'
import { compileESTree } from '../../../estree/compile/index.js'
import { createCompileIRContext } from '../../../ir/compile/context.js'
import { compileIR } from '../../../ir/compile/index.js'
import { optimizeIR } from '../../../ir/optimize/index.js'
import { compileJS } from '../../../js/compile/index.js'
import { Archetype } from '../../../lib/Archetype.js'
import { ArchetypeCallback } from '../../../lib/enums/ArchetypeCallback.js'
import { Func } from '../../../snode/nodes/Func.js'
import { SNode } from '../../../snode/nodes/index.js'
import { optimizeSNode } from '../../../snode/optimize/index.js'

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
    const node =
        callback === 'spawnOrder' || callback === 'shouldSpawn'
            ? (program.body[0] as ExpressionStatement).expression
            : program.body[0]

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
        order: archetype[`${callback}Order`],
        snode,
    }

    switch (callback) {
        case 'spawnOrder':
            if (typeof snode === 'number' && snode === 0) return
            break
        case 'shouldSpawn':
            if (typeof snode === 'number' && snode !== 0) return
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

const ignoreReturn = (snode: Func): SNode => {
    if (snode.func !== 'Execute') return snode

    const args = snode.args
    if (typeof args[args.length - 1] !== 'number') return snode

    if (args.length === 2) return args[0]

    return {
        func: 'Execute',
        args: snode.args.slice(0, snode.args.length - 1),
    }
}
