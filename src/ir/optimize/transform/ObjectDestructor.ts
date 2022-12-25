import { mapIR } from '../../map/index.js'
import { ObjectDestructor } from '../../nodes/ObjectDestructor.js'
import { TransformIR } from './index.js'
import { isConstant, transformIRAndGet } from './utils.js'

export const transformObjectDestructor: TransformIR<ObjectDestructor> = (ir, ctx) => {
    const object = transformIRAndGet(ir.object, ctx)
    const newIR = mapIR(ir, object)

    const result = isConstant(object)
    if (!result) return newIR

    newIR.target.object = result.value
    newIR.target.keys = Object.keys(result.value as never)

    return object
}
