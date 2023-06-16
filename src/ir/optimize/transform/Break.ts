import { Break } from '../../nodes/Break.js'
import { TransformIR } from './index.js'
import { transformIRAndGet } from './utils.js'

export const transformBreak: TransformIR<Break> = (ir, ctx) => ({
    ...ir,
    value: transformIRAndGet(ir.value, ctx),
})
