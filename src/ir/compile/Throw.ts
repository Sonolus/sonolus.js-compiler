import { Throw } from '../nodes/Throw.js'
import { CompileIR } from './index.js'

export const compileThrow: CompileIR<Throw> = (ir, ctx) => {
    throw ctx.error(
        ir,
        ir.arg.type === 'Value' && typeof ir.arg.value === 'string'
            ? `Thrown: ${ir.arg.value}`
            : 'Thrown',
    )
}
