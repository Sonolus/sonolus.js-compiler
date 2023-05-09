import { New } from '../nodes/New.js'
import { createMapIRVisitor } from './utils.js'

export const mapNew = createMapIRVisitor<New>((_, callee, args) => ({
    callee,
    args,
}))
