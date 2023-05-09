import { Intrinsic } from '../../../intrinsic/index.js'
import { Member } from '../../nodes/Member.js'
import { TransformIR } from './index.js'
import { isConstant, rewriteAsExecute, transformIRAndGet } from './utils.js'

export const transformMember: TransformIR<Member> = (ir, ctx) => {
    const object = transformIRAndGet(ir.object, ctx)
    const key = transformIRAndGet(ir.key, ctx)

    const objectResult = isConstant(object)
    if (!objectResult) return { ...ir, object, key }

    const keyResult = isConstant(key)
    if (!keyResult) return { ...ir, object, key }

    const descriptor = getPropertyDescriptor(objectResult.value, keyResult.value as never)
    if (!descriptor) return { ...ir, object, key }

    return rewriteAsExecute(ir, ctx, [
        object,
        key,
        ctx.value(
            ir,
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
                    args: ctx.value(ir, []),
                }),
        } satisfies Intrinsic<'Get'>)

    if ('set' in descriptor)
        Object.assign(value, {
            [Intrinsic.Set]: (ir, value, ctx) => {
                const array: unknown[] = []
                const children = [
                    ctx.ArrayAdd(ir, {
                        array,
                        value,
                    }),
                ]

                return ctx.Call(ir, {
                    callee: ctx.value(ir, descriptor.set, thisValue),
                    args: ctx.ArrayConstructor(ir, {
                        array,
                        children,
                    }),
                })
            },
        } satisfies Intrinsic<'Set'>)

    return value
}
