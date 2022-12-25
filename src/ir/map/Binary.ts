import { Binary } from '../nodes/Binary.js'
import { createMapIRVisitor } from './utils.js'

export const mapBinary = createMapIRVisitor<Binary>((ir, lhs, rhs) => ({
    operator: ir.operator,
    lhs,
    rhs,
}))
