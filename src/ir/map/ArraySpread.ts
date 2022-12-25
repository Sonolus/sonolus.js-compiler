import { ArraySpread } from '../nodes/ArraySpread.js'
import { createMapIRVisitor } from './utils.js'

export const mapArraySpread = createMapIRVisitor<ArraySpread>((ir, arg) => ({
    array: ir.array,
    arg,
}))
