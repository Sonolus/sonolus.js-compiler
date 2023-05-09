import { ArrayConstructor } from '../nodes/ArrayConstructor.js'
import { createMapIRVisitor } from './utils.js'

export const mapArrayConstructor = createMapIRVisitor<ArrayConstructor>((ir, ...children) => ({
    array: ir.array,
    children,
}))
