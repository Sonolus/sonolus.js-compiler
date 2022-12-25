import { ObjectDestructor } from '../nodes/ObjectDestructor.js'
import { createMapIRVisitor } from './utils.js'

export const mapObjectDestructor = createMapIRVisitor<ObjectDestructor>((ir, object) => ({
    object,
    target: ir.target,
}))
