import { ObjectAdd } from '../nodes/ObjectAdd.js'
import { IterateIR } from './index.js'

export const iterateObjectAdd: IterateIR<ObjectAdd> = (ir) => [ir.key, ir.value]
