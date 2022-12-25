import { mapIR } from '../../map/index.js'
import { ArrayDestructor } from '../../nodes/ArrayDestructor.js'
import { TransformIR } from './index.js'
import { isConstant, transformIRAndGet } from './utils.js'

export const transformArrayDestructor: TransformIR<ArrayDestructor> = (ir, ctx) => {
    const array = transformIRAndGet(ir.array, ctx)
    const newIR = mapIR(ir, array)

    const result = isConstant(array)
    if (!result) return newIR

    newIR.elements.length = 0
    newIR.elements.push(...(result.value as unknown[]))
    return array
}
