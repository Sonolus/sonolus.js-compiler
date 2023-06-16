import { Set } from '../../nodes/Set.js'
import { TransformIR } from './index.js'
import { transformIRAndGet } from './utils.js'

export const transformSet: TransformIR<Set> = (ir, ctx) => ({
    ...ir,
    value: transformIRAndGet(ir.value, ctx),
})
