import { Call } from '../nodes/Call.js'
import { createMapIRVisitor } from './utils.js'

export const mapCall = createMapIRVisitor<Call>((ir, callee, init) => ({
    callee,
    args: {
        init,
        value: ir.args.value,
    },
}))
