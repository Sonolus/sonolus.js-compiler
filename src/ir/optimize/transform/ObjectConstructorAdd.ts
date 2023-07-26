import { Intrinsic } from '../../../intrinsic/index.js'
import { ObjectConstructorAdd } from '../../nodes/ObjectConstructorAdd.js'
import { TransformIR } from './index.js'
import {
    isConstant,
    isReference,
    isResolved,
    rewriteAsExecute,
    transformIRAndGet,
} from './utils.js'

export const transformObjectConstructorAdd: TransformIR<ObjectConstructorAdd> = (ir, ctx) => {
    const key = transformIRAndGet(ir.key, ctx)
    const value = transformIRAndGet(ir.value, ctx)

    const keyResult = isConstant(key)
    if (!keyResult) return { ...ir, key, value }

    if (ir.kind === 'get' || ir.kind === 'set') {
        const valueResult = isConstant(value)
        if (!valueResult) return { ...ir, key, value }

        const descriptor = Object.getOwnPropertyDescriptor(
            ir.object,
            keyResult.value as PropertyKey,
        )
        Object.defineProperty(ir.object, keyResult.value as PropertyKey, {
            get: descriptor?.get as () => unknown,
            set: descriptor?.set as () => unknown,
            [ir.kind]: valueResult.value,

            enumerable: true,
            configurable: true,
        })

        return rewriteAsExecute(ir, ctx, [key, value, ctx.zero(ir)])
    }

    if (!isResolved(value)) return { ...ir, key, value }

    const valueResult = isReference(value)
    if (valueResult) {
        ir.object[keyResult.value as never] = valueResult.value as never

        return rewriteAsExecute(ir, ctx, [key, value, ctx.zero(ir)])
    }

    const temp = ctx.allocate()
    ir.object[keyResult.value as never] = temp as never

    return rewriteAsExecute(ir, ctx, [key, temp[Intrinsic.Set](ir, value, ctx), ctx.zero(ir)])
}
