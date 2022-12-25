import { Break } from '../nodes/Break.js'
import { createMapIRVisitor } from './utils.js'

export const mapBreak = createMapIRVisitor<Break>((ir, value) => ({
    target: ir.target,
    value,
}))
