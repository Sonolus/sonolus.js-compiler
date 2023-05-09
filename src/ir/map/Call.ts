import { Call } from '../nodes/Call.js'
import { createMapIRVisitor } from './utils.js'

export const mapCall = createMapIRVisitor<Call>((_, callee, args) => ({
    callee,
    args,
}))
