import { ArrayAdd } from '../nodes/ArrayAdd.js'
import { IterateIR } from './index.js'

export const iterateArrayAdd: IterateIR<ArrayAdd> = (ir) => [ir.value]
