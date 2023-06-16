import { ObjectConstructorSpread } from '../nodes/ObjectConstructorSpread.js'
import { createMapIRVisitor } from './utils.js'

export const mapObjectConstructorSpread = createMapIRVisitor<ObjectConstructorSpread>(
    (ir, arg) => ({
        object: ir.object,
        arg,
    }),
)
