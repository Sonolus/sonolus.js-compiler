import { While } from '../../nodes/While.js'
import { TransformIR } from './index.js'
import { transformIRAndGet } from './utils.js'

export const transformWhile: TransformIR<While> = (ir, ctx) => {
    const test = transformIRAndGet(ir.test, ctx)
    const body = transformIRAndGet(ir.body, ctx)

    return { ...ir, test, body }
}
