import { ArrayConstructorSpread } from '../nodes/ArrayConstructorSpread.js'
import { createMapIRVisitor } from './utils.js'

export const mapArrayConstructorSpread = createMapIRVisitor<ArrayConstructorSpread>((ir, arg) => ({
    array: ir.array,
    arg,
}))
