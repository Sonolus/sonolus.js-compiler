import { Throw } from '../nodes/Throw.js'
import { createMapIRVisitor } from './utils.js'

export const mapThrow = createMapIRVisitor<Throw>((ir, arg) => ({
    arg,
}))
