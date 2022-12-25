import { mapIR } from '../../map/index.js'
import { DoWhile } from '../../nodes/DoWhile.js'
import { TransformIR } from './index.js'
import { transformIRAndGet } from './utils.js'

export const transformDoWhile: TransformIR<DoWhile> = (ir, ctx) => {
    const body = transformIRAndGet(ir.body, ctx)
    const test = transformIRAndGet(ir.test, ctx)

    return mapIR(ir, body, test)
}
