import { ObjectDestructorGet } from '../nodes/ObjectDestructorGet.js'
import { createMapIRVisitor } from './utils.js'

export const mapObjectDestructorGet = createMapIRVisitor<ObjectDestructorGet>((ir, key) => ({
    target: ir.target,
    key,
}))
