import { ArrayConstructor } from '../nodes/ArrayConstructor.js'
import { IterateIR } from './index.js'

export const iterateArrayConstructor: IterateIR<ArrayConstructor> = (ir) => ir.children.slice()
