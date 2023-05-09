import { ArrayDestructorGet } from '../nodes/ArrayDestructorGet.js'
import { createMapIRVisitor } from './utils.js'

export const mapArrayDestructorGet = createMapIRVisitor<ArrayDestructorGet>((ir) => ({
    target: ir.target,
}))
