import { Intrinsic } from '../../../intrinsic/index.js'
import { mapIR } from '../../map/index.js'
import { ObjectAdd } from '../../nodes/ObjectAdd.js'
import { TransformIR } from './index.js'
import { isConstant, isReference, rewriteAsExecute, transformIRAndGet } from './utils.js'

export const transformObjectAdd: TransformIR<ObjectAdd> = (ir, ctx) => {
    const key = transformIRAndGet(ir.key, ctx)
    const value = transformIRAndGet(ir.value, ctx)
    const newIR = mapIR(ir, key, value)

    const keyResult = isConstant(key)
    if (!keyResult) return newIR

    if (newIR.kind === 'get' || newIR.kind === 'set') {
        const valueResult = isConstant(value)
        if (!valueResult) return newIR

        const descriptor = Object.getOwnPropertyDescriptor(newIR.object, keyResult.value as never)
        Object.defineProperty(newIR.object, keyResult.value as never, {
            get: descriptor?.get,
            set: descriptor?.set,
            [newIR.kind]: valueResult.value,

            enumerable: true,
            configurable: true,
        })

        return rewriteAsExecute(newIR, ctx, [key, value, ctx.zero(newIR)])
    }

    const valueResult = isReference(value)
    if (valueResult) {
        newIR.object[keyResult.value as never] = valueResult.value as never

        return rewriteAsExecute(newIR, ctx, [key, value, ctx.zero(newIR)])
    }

    const temp = ctx.allocate()
    newIR.object[keyResult.value as never] = temp as never

    return rewriteAsExecute(newIR, ctx, [
        key,
        temp[Intrinsic.Set](newIR, value, ctx),
        ctx.zero(newIR),
    ])
}
