import { Value } from '../nodes/Value.js'
import { createMapIRVisitor } from './utils.js'

export const mapValue = createMapIRVisitor<Value>((ir) => ({
    value: ir.value,
    thisValue: ir.thisValue,
    isSuper: ir.isSuper,
}))
