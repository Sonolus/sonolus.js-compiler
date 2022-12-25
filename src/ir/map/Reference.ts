import { Reference } from '../nodes/Reference.js'
import { createMapIRVisitor } from './utils.js'

export const mapReference = createMapIRVisitor<Reference>((ir) => ({
    name: ir.name,
}))
