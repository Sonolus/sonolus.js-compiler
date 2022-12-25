import { New } from '../nodes/New.js'
import { createMapIRVisitor } from './utils.js'

export const mapNew = createMapIRVisitor<New>((ir, callee, init) => ({
    callee,
    args: {
        init,
        value: ir.args.value,
    },
}))
