import { isIterable } from '../../../utils/iterable.js'
import { ArrayDestructor } from '../../nodes/ArrayDestructor.js'
import { TransformIR } from './index.js'
import { isConstant, transformIRAndGet } from './utils.js'

export const transformArrayDestructor: TransformIR<ArrayDestructor> = (ir, ctx) => {
    const array = transformIRAndGet(ir.array, ctx)

    const result = isConstant(array)
    if (!result) return { ...ir, array }

    if (!isIterable(result.value)) return { ...ir, array }

    ir.target.elements = [...result.value]

    return array
}
