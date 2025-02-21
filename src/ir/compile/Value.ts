import { Value } from '../nodes/Value.js'
import { CompileIR } from './index.js'

export const compileValue: CompileIR<Value> = (ir, ctx) => {
    switch (typeof ir.value) {
        case 'number':
        case 'boolean': {
            const value = +ir.value
            if (Number.isNaN(value))
                throw ctx.error(ir, `Conversion of value ${ir.value} results in NaN`)

            return value
        }
        default:
            throw ctx.error(ir, `Value of ${typeof ir.value} type must be resolved at compile time`)
    }
}
