import { ArrayAdd } from '../nodes/ArrayAdd.js'
import { createMapIRVisitor } from './utils.js'

export const mapArrayAdd = createMapIRVisitor<ArrayAdd>((ir, value) => ({
    array: ir.array,
    value,
}))
