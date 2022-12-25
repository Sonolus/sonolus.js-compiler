import { Conditional } from '../nodes/Conditional.js'
import { createMapIRVisitor } from './utils.js'

export const mapConditional = createMapIRVisitor<Conditional>((_, test, consequent, alternate) => ({
    test,
    consequent,
    alternate,
}))
