import { CompileESTreeContext } from '../estree/compile/context.js'
import { ForOf } from '../ir/nodes/ForOf.js'
import { IR } from '../ir/nodes/index.js'
import { TransformIRContext } from '../ir/optimize/transform/context.js'

const IntrinsicCall = Symbol('Intrinsic.Call')
const IntrinsicGet = Symbol('Intrinsic.Get')
const IntrinsicIterate = Symbol('Intrinsic.Iterate')
const IntrinsicSet = Symbol('Intrinsic.Set')

export const Intrinsic = {
    Call: IntrinsicCall,
    Get: IntrinsicGet,
    Set: IntrinsicSet,
    Iterate: IntrinsicIterate,
} as const

export type IntrinsicCall = (
    ir: IR,
    thisValue: unknown,
    args: unknown[],
    ctx: TransformIRContext,
) => IR
export type IntrinsicGet = (ir: IR, ctx: TransformIRContext) => IR
export type IntrinsicIterate = (
    ir: ForOf,
    thisValue: unknown,
    estreeCtx: CompileESTreeContext,
    ctx: TransformIRContext,
) => IR
export type IntrinsicSet = (ir: IR, value: IR, ctx: TransformIRContext) => IR

type IntrinsicOperations = {
    [Intrinsic.Call]: IntrinsicCall
    [Intrinsic.Get]: IntrinsicGet
    [Intrinsic.Set]: IntrinsicSet
    [Intrinsic.Iterate]: IntrinsicIterate
}

export type Intrinsic<K extends keyof typeof Intrinsic = never> = Pick<
    IntrinsicOperations,
    (typeof Intrinsic)[K]
>
