import { mapIR } from '../../map/index.js'
import { Break } from '../../nodes/Break.js'
import { TransformIR } from './index.js'
import { transformIRAndGet } from './utils.js'

export const transformBreak: TransformIR<Break> = (ir, ctx) =>
    mapIR(ir, transformIRAndGet(ir.value, ctx))
