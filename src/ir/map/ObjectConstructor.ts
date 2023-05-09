import { ObjectConstructor } from '../nodes/ObjectConstructor.js'
import { createMapIRVisitor } from './utils.js'

export const mapObjectConstructor = createMapIRVisitor<ObjectConstructor>((ir, ...children) => ({
    object: ir.object,
    children,
}))
