import { SNode } from '../../snode/nodes/index.js'
import { visit } from '../../utils/visitor.js'
import { iterateIR } from '../iterate/index.js'
import { IR } from '../nodes/index.js'
import { compileBinary } from './Binary.js'
import { compileBlock } from './Block.js'
import { compileBreak } from './Break.js'
import { compileConditional } from './Conditional.js'
import { CompileIRContext } from './context.js'
import { compileDoWhile } from './DoWhile.js'
import { compileExecute } from './Execute.js'
import { compileGet } from './Get.js'
import { compileLogical } from './Logical.js'
import { compileNative } from './Native.js'
import { compileSet } from './Set.js'
import { compileThrow } from './Throw.js'
import { compileUnary } from './Unary.js'
import { compileValue } from './Value.js'
import { compileWhile } from './While.js'

export type CompileIR<N extends IR> = (ir: N, ctx: CompileIRContext) => SNode

export const compileIR = visit<CompileIR<IR>>().create(
    'compile',
    {
        compileBinary,
        compileBlock,
        compileBreak,
        compileConditional,
        compileDoWhile,
        compileExecute,
        compileGet,
        compileLogical,
        compileNative,
        compileSet,
        compileThrow,
        compileUnary,
        compileValue,
        compileWhile,
    },
    (ir, ctx) => {
        for (const child of iterateIR(ir)) {
            compileIR(child, ctx)
        }

        throw ctx.error(ir, `${ir.type} must be resolved at compile time`)
    },
)
