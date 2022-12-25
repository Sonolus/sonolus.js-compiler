import { Logical } from '../nodes/Logical.js'
import { createMapIRVisitor } from './utils.js'

export const mapLogical = createMapIRVisitor<Logical>((ir, lhs, rhs) => ({
    operator: ir.operator,
    lhs,
    rhs,
}))
