import { ObjectConstructor } from '../nodes/ObjectConstructor.js'
import { IterateIR } from './index.js'

export const iterateObjectConstructor: IterateIR<ObjectConstructor> = (ir) => ir.children.slice()
