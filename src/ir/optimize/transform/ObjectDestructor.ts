import { ObjectDestructor } from '../../nodes/ObjectDestructor.js'
import { TransformIR } from './index.js'
import { isConstant, transformIRAndGet } from './utils.js'

export const transformObjectDestructor: TransformIR<ObjectDestructor> = (ir, ctx) => {
    const object = transformIRAndGet(ir.object, ctx)

    const result = isConstant(object)
    if (!result) return { ...ir, object }

    ir.target.object = result.value
    ir.target.keys = Object.keys(result.value as never)

    return object
}
