import { ObjectDestructorRest } from '../nodes/ObjectDestructorRest.js'
import { createMapIRVisitor } from './utils.js'

export const mapObjectDestructorRest = createMapIRVisitor<ObjectDestructorRest>((ir) => ({
    target: ir.target,
}))
