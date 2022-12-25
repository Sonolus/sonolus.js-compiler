import { RuntimeFunction } from 'sonolus-core'
import { mapIR } from '../../map/index.js'
import { Native } from '../../nodes/Native.js'
import { Value } from '../../nodes/Value.js'
import { TransformIR } from './index.js'
import { isConstant, transformIRAndGet } from './utils.js'

export const transformNative: TransformIR<Native> = (ir, ctx) => {
    const children = ir.args.map((arg) => transformIRAndGet(arg, ctx))
    const newIR = mapIR(ir, ...children)

    const result = funcs[newIR.func]
    if (!result) return newIR

    const [length, func] = result
    if (length !== Infinity && children.length !== length) return newIR

    const args = children.map(isConstant)
    if (!args.every((arg): arg is Value => !!arg)) return newIR

    return ctx.value(newIR, func(...args.map((arg) => arg.value as never)))
}

const reducer =
    (fn: (a: number, b: number) => number) =>
    (...values: number[]) => {
        if (!values.length) return 0

        const [head, ...rest] = values
        if (!rest.length) return head

        let sum = head
        for (const value of rest) {
            sum = fn(sum, value)
        }

        return sum
    }

const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x))

const lerp = (x: number, y: number, s: number) => x * (1 - s) + y * s

const unlerp = (a: number, b: number, x: number) => (x - a) / (b - a)

const funcs: Partial<Record<RuntimeFunction, [number, (...values: number[]) => number]>> = {
    Add: [Infinity, reducer((a, b) => a + b)],
    Multiply: [Infinity, reducer((a, b) => a * b)],
    Divide: [Infinity, reducer((a, b) => a / b)],
    Rem: [Infinity, reducer((a, b) => a % b)],
    Mod: [Infinity, reducer((a, b) => ((a % b) + b) % b)],
    Power: [Infinity, reducer((a, b) => a ** b)],
    Log: [1, Math.log],
    Negate: [1, (x) => -x],

    Equal: [2, (a, b) => +(a === b)],
    NotEqual: [2, (a, b) => +(a !== b)],
    Greater: [2, (a, b) => +(a > b)],
    GreaterOr: [2, (a, b) => +(a >= b)],
    Less: [2, (a, b) => +(a < b)],
    LessOr: [2, (a, b) => +(a <= b)],

    Not: [1, (x) => +!x],

    Abs: [1, Math.abs],
    Sign: [1, Math.sign],
    Min: [2, Math.min],
    Max: [2, Math.max],

    Ceil: [1, Math.ceil],
    Floor: [1, Math.floor],
    Round: [1, Math.round],
    Frac: [1, (x) => x - Math.floor(x)],
    Trunc: [1, Math.trunc],

    Degree: [1, (x) => (x * 180) / Math.PI],
    Radian: [1, (x) => (x * Math.PI) / 180],

    Sin: [1, Math.sin],
    Cos: [1, Math.cos],
    Tan: [1, Math.tan],

    Sinh: [1, Math.sinh],
    Cosh: [1, Math.cosh],
    Tanh: [1, Math.tanh],

    Arcsin: [1, Math.asin],
    Arccos: [1, Math.acos],
    Arctan: [1, Math.atan],
    Arctan2: [2, Math.atan2],

    Clamp: [3, clamp],
    Lerp: [3, lerp],
    LerpClamped: [3, (x, y, s) => lerp(x, y, clamp(s, 0, 1))],
    Unlerp: [3, unlerp],
    UnlerpClamped: [3, (a, b, x) => clamp(unlerp(a, b, x), 0, 1)],
    Remap: [5, (a, b, c, d, x) => lerp(c, d, unlerp(a, b, x))],
    RemapClamped: [5, (a, b, c, d, x) => lerp(c, d, clamp(unlerp(a, b, x), 0, 1))],
}
