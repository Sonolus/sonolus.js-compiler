import { CompileESTreeContext } from '../../estree/compile/context.js'
import { compileESTree } from '../../estree/compile/index.js'
import { compileForOfBindings } from '../../estree/compile/utils/forOf.js'
import { ForOf } from '../../ir/nodes/ForOf.js'
import { IR } from '../../ir/nodes/index.js'
import { TransformIRContext } from '../../ir/optimize/transform/context.js'

export const createIterate = (
    ir: ForOf,
    test: (index: () => IR) => IR,
    value: (index: () => IR) => IR,
    estreeCtx: CompileESTreeContext,
    ctx: TransformIRContext,
): IR => {
    const name = `temp:${Math.random()}`

    const index = () =>
        ctx.Reference(ir.value, {
            name,
        })

    return estreeCtx.lexical(() =>
        estreeCtx.break(ir.node, () =>
            ctx.Execute(ir, {
                children: [
                    ctx.Declare(ir.value, {
                        name,
                        value: ctx.zero(ir.value),
                    }),
                    ctx.While(ir, {
                        test: test(index),
                        body: ctx.Execute(ir, {
                            children: [
                                ...compileForOfBindings(ir.node.left, value(index), estreeCtx),
                                estreeCtx.continue(ir.node, () =>
                                    compileESTree(ir.node.body, estreeCtx),
                                ),
                                ctx.Assign(ir.value, {
                                    operator: '+=',
                                    lhs: index(),
                                    rhs: ctx.value(ir.value, 1),
                                }),
                                ctx.zero(ir),
                            ],
                        }),
                    }),
                ],
            }),
        ),
    )
}
