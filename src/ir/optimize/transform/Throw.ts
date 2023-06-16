import { Throw } from '../../nodes/Throw.js'
import { TransformIR } from './index.js'
import { transformIRAndGet } from './utils.js'

export const transformThrow: TransformIR<Throw> = (ir, ctx) => ({
    ...ir,
    arg: transformIRAndGet(ir.arg, ctx),
})
