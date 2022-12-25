import { mapIR } from '../../map/index.js'
import { Set } from '../../nodes/Set.js'
import { TransformIR } from './index.js'
import { transformIRAndGet } from './utils.js'

export const transformSet: TransformIR<Set> = (ir, ctx) =>
    mapIR(ir, transformIRAndGet(ir.value, ctx))
