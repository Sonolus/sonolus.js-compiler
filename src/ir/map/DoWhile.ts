import { DoWhile } from '../nodes/DoWhile.js'
import { createMapIRVisitor } from './utils.js'

export const mapDoWhile = createMapIRVisitor<DoWhile>((_, body, test) => ({
    body,
    test,
}))
