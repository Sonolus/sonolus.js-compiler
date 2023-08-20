import { SNode } from '../nodes/index.js'
import { OptimizeFunc, optimizeSNode } from './index.js'
import { isValue } from './utils.js'

export const optimizeSwitchWithDefault: OptimizeFunc<'SwitchWithDefault'> = (snode) => {
    const discriminant = snode.args[0]
    const cases = snode.args.slice(1, -1)
    const defaultCase = snode.args[snode.args.length - 1]

    const result = tryNormalize(cases)
    if (result)
        return {
            func: 'SwitchIntegerWithDefault',
            args: [
                optimizeSNode({
                    func: 'Divide',
                    args: [
                        {
                            func: 'Subtract',
                            args: [discriminant, result.a],
                        },
                        result.d,
                    ],
                }),
                ...cases.filter((_, i) => i % 2 === 1),
                defaultCase,
            ],
        }

    return snode
}

const tryNormalize = (cases: SNode[]) => {
    const tests = cases.filter((_, i) => i % 2 === 0)
    if (!tests.every(isValue)) return

    const a = tests[0]
    if (!Number.isSafeInteger(a)) return

    const d = tests[1] - a
    if (!Number.isSafeInteger(d)) return

    if (!tests.every((value, i) => value === a + d * i)) return

    return { a, d }
}
