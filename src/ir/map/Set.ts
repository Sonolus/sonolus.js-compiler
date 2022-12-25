import { Set } from '../nodes/Set.js'
import { createMapIRVisitor } from './utils.js'

export const mapSet = createMapIRVisitor<Set>((ir, value) => ({
    target: ir.target,
    value,
}))
