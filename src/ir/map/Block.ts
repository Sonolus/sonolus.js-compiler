import { Block } from '../nodes/Block.js'
import { createMapIRVisitor } from './utils.js'

export const mapBlock = createMapIRVisitor<Block>((ir, body) => ({
    target: ir.target,
    body,
}))
