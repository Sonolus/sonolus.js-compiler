import { mapIR } from '../../map/index.js'
import { Throw } from '../../nodes/Throw.js'
import { TransformIR } from './index.js'
import { transformIRAndGet } from './utils.js'

export const transformThrow: TransformIR<Throw> = (ir, ctx) =>
    mapIR(ir, transformIRAndGet(ir.arg, ctx))
