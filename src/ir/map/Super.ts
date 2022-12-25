import { Super } from '../nodes/Super.js'
import { createMapIRVisitor } from './utils.js'

export const mapSuper = createMapIRVisitor<Super>((ir, init) => ({
    instance: ir.instance,
    prototype: ir.prototype,
    args: {
        init,
        value: ir.args.value,
    },
}))
