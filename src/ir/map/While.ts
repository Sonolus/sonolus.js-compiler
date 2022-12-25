import { While } from '../nodes/While.js'
import { createMapIRVisitor } from './utils.js'

export const mapWhile = createMapIRVisitor<While>((_, test, body) => ({
    test,
    body,
}))
