import { ArrayConstructorAdd } from '../nodes/ArrayConstructorAdd.js'
import { createMapIRVisitor } from './utils.js'

export const mapArrayConstructorAdd = createMapIRVisitor<ArrayConstructorAdd>((ir, value) => ({
    array: ir.array,
    value,
}))
