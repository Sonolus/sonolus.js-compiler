import { Assign } from '../nodes/Assign.js'
import { createMapIRVisitor } from './utils.js'

export const mapAssign = createMapIRVisitor<Assign>((ir, lhs, rhs) => ({
    operator: ir.operator,
    lhs,
    rhs,
}))
