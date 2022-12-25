import { ObjectAdd } from '../nodes/ObjectAdd.js'
import { createMapIRVisitor } from './utils.js'

export const mapObjectAdd = createMapIRVisitor<ObjectAdd>((ir, key, value) => ({
    object: ir.object,
    kind: ir.kind,
    key,
    value,
}))
