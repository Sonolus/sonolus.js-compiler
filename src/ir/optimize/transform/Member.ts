import { Intrinsic } from '../../../intrinsic/index.js'
import { mapIR } from '../../map/index.js'
import { Member } from '../../nodes/Member.js'
import { TransformIR } from './index.js'
import { isConstant, rewriteAsExecute, transformIRAndGet } from './utils.js'

export const transformMember: TransformIR<Member> = (ir, ctx) => {
    const object = transformIRAndGet(ir.object, ctx)
    const key = transformIRAndGet(ir.key, ctx)
    const newIR = mapIR(ir, object, key)

    const objectResult = isConstant(object)
    if (!objectResult) return newIR

    const keyResult = isConstant(key)
    if (!keyResult) return newIR

    const descriptor = getPropertyDescriptor(objectResult.value, keyResult.value as never)
    if (!descriptor) return newIR

    return rewriteAsExecute(newIR, ctx, [
        object,
        key,
        ctx.value(
            newIR,
            toValue(descriptor, objectResult.value),
            objectResult.isSuper ? objectResult.thisValue : objectResult.value,
        ),
    ])
}

const getPropertyDescriptor = (object: unknown, key: PropertyKey) => {
    while (object) {
        const descriptor = Object.getOwnPropertyDescriptor(object, key)
        if (descriptor) return descriptor

        object = Object.getPrototypeOf(object)
    }
}

const toValue = (descriptor: PropertyDescriptor, thisValue: unknown) => {
    if ('value' in descriptor) return descriptor.value

    const value = {}

    if ('get' in descriptor)
        Object.assign(value, {
            [Intrinsic.Get]: (ir, ctx) =>
                ctx.Call(ir, {
                    callee: ctx.value(ir, descriptor.get, thisValue),
                    args: {
                        init: ctx.zero(ir),
                        value: [],
                    },
                }),
        } satisfies Intrinsic<'Get'>)

    if ('set' in descriptor)
        Object.assign(value, {
            [Intrinsic.Set]: (ir, value, ctx) => {
                const array: unknown[] = []

                return ctx.Call(ir, {
                    callee: ctx.value(ir, descriptor.set, thisValue),
                    args: {
                        init: ctx.ArrayAdd(ir, {
                            array,
                            value,
                        }),
                        value: array,
                    },
                })
            },
        } satisfies Intrinsic<'Set'>)

    return value
}
