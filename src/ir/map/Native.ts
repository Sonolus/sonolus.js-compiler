import { Native } from '../nodes/Native.js'
import { createMapIRVisitor } from './utils.js'

export const mapNative = createMapIRVisitor<Native>((ir, ...args) => ({
    func: ir.func,
    args,
}))
