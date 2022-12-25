import { Intrinsic } from '../../../intrinsic/index.js'
import { CompilerError } from '../../../utils/CompilerError.js'
import { IR, IRTypes } from '../../nodes/index.js'
import { Value } from '../../nodes/Value.js'

type IRFunctions = {
    [N in IR as N['type']]: (ir: IR, props: Omit<N, 'stackTraces' | 'env' | 'type'>) => N
}

export type TransformIRContext = IRFunctions & {
    error(ir: IR, message: string): CompilerError
    zero(ir: IR): Value
    value(ir: IR, value: unknown, thisValue?: unknown, isSuper?: boolean): Value
    allocate(): Intrinsic<'Get' | 'Set'>
}

export const createTransformIRContext = (): TransformIRContext => {
    const irFunctions = Object.fromEntries(
        IRTypes.map((type) => [
            type,
            (ir: IR, props: object) => ({
                stackTraces: ir.stackTraces,
                env: ir.env,

                type,
                ...props,
            }),
        ]),
    ) as IRFunctions

    return {
        ...irFunctions,

        error: (ir, message) => new CompilerError(ir.stackTraces, message),

        zero: (ir) =>
            irFunctions.Value(ir, {
                value: 0,
                thisValue: undefined,
                isSuper: false,
            }),

        value: (ir, value, thisValue, isSuper = false) =>
            irFunctions.Value(ir, {
                value,
                thisValue,
                isSuper,
            }),

        allocate() {
            const target = {}

            return {
                [Intrinsic.Get]: (ir, ctx) =>
                    ctx.Get(ir, {
                        target,
                    }),

                [Intrinsic.Set]: (ir, value, ctx) =>
                    ctx.Execute(ir, {
                        children: [
                            ctx.Set(ir, {
                                target,
                                value,
                            }),
                            ctx.Get(ir, {
                                target,
                            }),
                        ],
                    }),
            }
        },
    }
}
