import { RuntimeFunction } from '@sonolus/core'
import { Func } from '../nodes/Func.js'
import { SNode } from '../nodes/index.js'

export const isValue = (arg: SNode): arg is number => typeof arg === 'number'

export const isFunc = <T extends RuntimeFunction>(arg: SNode, func: T): arg is Func<T> =>
    typeof arg === 'object' && arg.func === func

export const isFuncs = <T extends RuntimeFunction>(arg: SNode, funcs: T[]): arg is Func<T> =>
    typeof arg === 'object' && funcs.includes(arg.func as never)

export const isEquivalent = (a: SNode, b: SNode): boolean => {
    if (isValue(a)) return a === b

    if (isValue(b)) return false

    if (a.func !== b.func) return false
    if (a.args.length !== b.args.length) return false

    if (a.func !== 'Get' && a.func !== 'GetShifted') return false

    return a.args.every((arg, i) => isEquivalent(arg, b.args[i]))
}
