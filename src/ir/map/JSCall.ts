import { JSCall } from '../nodes/JSCall.js'
import { createMapIRVisitor } from './utils.js'

export const mapJSCall = createMapIRVisitor<JSCall>((ir, ...args) => ({
    func: ir.func,
    thisValue: ir.thisValue,
    args,
}))
