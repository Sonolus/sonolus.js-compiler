import { Declare } from '../nodes/Declare.js'
import { createMapIRVisitor } from './utils.js'

export const mapDeclare = createMapIRVisitor<Declare>((ir, value) => ({
    name: ir.name,
    value,
}))
