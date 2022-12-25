import { Unary } from '../nodes/Unary.js'
import { createMapIRVisitor } from './utils.js'

export const mapUnary = createMapIRVisitor<Unary>((ir, arg) => ({
    operator: ir.operator,
    arg,
}))
