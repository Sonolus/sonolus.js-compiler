import { ArrayDestructor } from '../nodes/ArrayDestructor.js'
import { createMapIRVisitor } from './utils.js'

export const mapArrayDestructor = createMapIRVisitor<ArrayDestructor>((ir, array) => ({
    array,
    target: ir.target,
}))
