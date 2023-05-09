import { ObjectConstructorAdd } from '../nodes/ObjectConstructorAdd.js'
import { createMapIRVisitor } from './utils.js'

export const mapObjectConstructorAdd = createMapIRVisitor<ObjectConstructorAdd>(
    (ir, key, value) => ({
        object: ir.object,
        kind: ir.kind,
        key,
        value,
    }),
)
