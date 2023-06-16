import { ObjectConstructorAdd } from '../nodes/ObjectConstructorAdd.js'
import { IterateIR } from './index.js'

export const iterateObjectConstructorAdd: IterateIR<ObjectConstructorAdd> = (ir) => [
    ir.key,
    ir.value,
]
