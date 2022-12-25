import { mapIR } from '../../map/index.js'
import { Value } from '../../nodes/Value.js'
import { TransformIR } from './index.js'

export const transformValue: TransformIR<Value> = mapIR
