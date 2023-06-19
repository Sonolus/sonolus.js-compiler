import { SNode } from '../../snode/nodes/index.js'
import { visit } from '../../utils/visitor.js'
import { IR } from '../nodes/index.js'
import { compileArrayConstructor } from './ArrayConstructor.js'
import { compileArrayConstructorAdd } from './ArrayConstructorAdd.js'
import { compileArrayConstructorSpread } from './ArrayConstructorSpread.js'
import { compileArrayDestructor } from './ArrayDestructor.js'
import { compileArrayDestructorGet } from './ArrayDestructorGet.js'
import { compileArrayDestructorRest } from './ArrayDestructorRest.js'
import { compileAssign } from './Assign.js'
import { compileBinary } from './Binary.js'
import { compileBlock } from './Block.js'
import { compileBreak } from './Break.js'
import { compileCall } from './Call.js'
import { compileConditional } from './Conditional.js'
import { CompileIRContext } from './context.js'
import { compileDeclare } from './Declare.js'
import { compileDoWhile } from './DoWhile.js'
import { compileExecute } from './Execute.js'
import { compileForOf } from './ForOf.js'
import { compileGet } from './Get.js'
import { compileJSCall } from './JSCall.js'
import { compileLogical } from './Logical.js'
import { compileMember } from './Member.js'
import { compileNative } from './Native.js'
import { compileNew } from './New.js'
import { compileObjectConstructor } from './ObjectConstructor.js'
import { compileObjectConstructorAdd } from './ObjectConstructorAdd.js'
import { compileObjectConstructorSpread } from './ObjectConstructorSpread.js'
import { compileObjectDestructor } from './ObjectDestructor.js'
import { compileObjectDestructorGet } from './ObjectDestructorGet.js'
import { compileObjectDestructorRest } from './ObjectDestructorRest.js'
import { compileReference } from './Reference.js'
import { compileSet } from './Set.js'
import { compileSuper } from './Super.js'
import { compileThrow } from './Throw.js'
import { compileUnary } from './Unary.js'
import { compileValue } from './Value.js'
import { compileWhile } from './While.js'

export type CompileIR<N extends IR> = (ir: N, ctx: CompileIRContext) => SNode

export const compileIR = visit<CompileIR<IR>>().create('compile', {
    compileArrayConstructor,
    compileArrayConstructorAdd,
    compileArrayConstructorSpread,
    compileArrayDestructor,
    compileArrayDestructorGet,
    compileArrayDestructorRest,
    compileAssign,
    compileBinary,
    compileBlock,
    compileBreak,
    compileCall,
    compileConditional,
    compileDeclare,
    compileDoWhile,
    compileExecute,
    compileForOf,
    compileGet,
    compileJSCall,
    compileLogical,
    compileMember,
    compileNative,
    compileNew,
    compileObjectConstructor,
    compileObjectConstructorAdd,
    compileObjectConstructorSpread,
    compileObjectDestructor,
    compileObjectDestructorGet,
    compileObjectDestructorRest,
    compileReference,
    compileSet,
    compileSuper,
    compileThrow,
    compileUnary,
    compileValue,
    compileWhile,
})
