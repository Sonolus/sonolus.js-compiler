import { ObjectSpread } from '../nodes/ObjectSpread.js'
import { createMapIRVisitor } from './utils.js'

export const mapObjectSpread = createMapIRVisitor<ObjectSpread>((ir, arg) => ({
    object: ir.object,
    arg,
}))
