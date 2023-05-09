import { ArrayConstructorAdd } from '../nodes/ArrayConstructorAdd.js'
import { IterateIR } from './index.js'

export const iterateArrayConstructorAdd: IterateIR<ArrayConstructorAdd> = (ir) => [ir.value]
