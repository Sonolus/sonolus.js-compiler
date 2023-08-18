import { RuntimeFunction } from 'sonolus-core'
import { Intrinsic } from '../../../intrinsic/index.js'
import { IR } from '../../../ir/nodes/index.js'
import { TransformIRContext } from '../../../ir/optimize/transform/context.js'

export type Pointer = {
    id: number | (() => IR)
    x: number | (() => IR)
    y: number | (() => IR)
    s: number | (() => IR)
    writableCallbacks: string[]
} & Intrinsic<'Get' | 'Set'>

export const pointer = <T>(
    id: number | (() => IR),
    x: number | (() => IR),
    y: number | (() => IR),
    s: number | (() => IR),
    writableCallbacks: string[],
): T & Intrinsic<'Get' | 'Set'> =>
    ({
        id,
        x,
        y,
        s,
        writableCallbacks,

        [Intrinsic.Get]: (ir, ctx) => pointerNative(ir, 'GetShifted', [id, x, y, s], ctx),
        [Intrinsic.Set]: (ir, value, ctx) => {
            if (!writableCallbacks.includes(ir.env.callback as never))
                throw ctx.error(ir, `Cannot mutate in ${ir.env.callback} callback`)

            return pointerNative(ir, 'SetShifted', [id, x, y, s, () => value], ctx)
        },
    }) satisfies Pointer as never

export const createPointer =
    <T extends string>(writableCallbacks: T[]) =>
    <T>(
        id: number | (() => IR),
        x: number | (() => IR),
        y: number | (() => IR),
        s: number | (() => IR),
    ): T & Intrinsic<'Get' | 'Set'> =>
        pointer(id, x, y, s, writableCallbacks)

const pointerNative = (
    ir: IR,
    func: RuntimeFunction,
    args: (number | (() => IR))[],
    ctx: TransformIRContext,
) =>
    ctx.Native(ir, {
        func,
        args: args.map((arg) => (typeof arg === 'number' ? ctx.value(ir, arg) : arg())),
    })
