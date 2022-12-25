import { ForOf } from '../nodes/ForOf.js'
import { createMapIRVisitor } from './utils.js'

export const mapForOf = createMapIRVisitor<ForOf>((ir, value) => ({
    node: ir.node,
    thisValue: ir.thisValue,
    prototype: ir.prototype,
    value,
}))
