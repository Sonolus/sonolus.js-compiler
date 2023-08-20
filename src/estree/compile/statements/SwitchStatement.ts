import { Expression, SwitchCase, SwitchStatement } from 'estree'
import { CompileESTree, compileESTree } from '../index.js'

export const compileSwitchStatement: CompileESTree<SwitchStatement> = (node, ctx) => {
    const discriminant = compileESTree(node.discriminant, ctx)

    const defaultCase = node.cases.find(({ test }) => !test)

    return ctx.break(node, () =>
        ctx.Switch(node, {
            discriminant,
            defaultCase: defaultCase ? compileConsequent(defaultCase, ctx) : ctx.zero(node),
            cases: node.cases
                .filter((node): node is SwitchCase & { test: Expression } => !!node.test)
                .map((node) => ({
                    test: compileESTree(node.test, ctx),
                    consequent: compileConsequent(node, ctx),
                })),
        }),
    )
}

const compileConsequent: CompileESTree<SwitchCase> = (node, ctx) =>
    ctx.Execute(node, {
        children: [
            ...node.consequent.map((node) => compileESTree(node, ctx)),
            node.test
                ? ctx.Throw(node, {
                      arg: ctx.value(node, 'Switch case fall through is not supported'),
                  })
                : ctx.zero(node),
        ],
    })
