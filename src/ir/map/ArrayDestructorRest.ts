import { ArrayDestructorRest } from '../nodes/ArrayDestructorRest.js'
import { createMapIRVisitor } from './utils.js'

export const mapArrayDestructorRest = createMapIRVisitor<ArrayDestructorRest>((ir) => ({
    elements: ir.elements,
}))
