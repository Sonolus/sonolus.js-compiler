import { visit } from '../../../utils/visitor.js'
import { IR } from '../../nodes/index.js'
import { transformArrayAdd } from './ArrayAdd.js'
import { transformArrayDestructor } from './ArrayDestructor.js'
import { transformArrayDestructorGet } from './ArrayDestructorGet.js'
import { transformArrayDestructorRest } from './ArrayDestructorRest.js'
import { transformArraySpread } from './ArraySpread.js'
import { transformAssign } from './Assign.js'
import { transformBinary } from './Binary.js'
import { transformBlock } from './Block.js'
import { transformBreak } from './Break.js'
import { transformCall } from './Call.js'
import { transformConditional } from './Conditional.js'
import { transformDeclare } from './Declare.js'
import { transformDoWhile } from './DoWhile.js'
import { transformExecute } from './Execute.js'
import { transformForOf } from './ForOf.js'
import { transformGet } from './Get.js'
import { transformJSCall } from './JSCall.js'
import { transformLogical } from './Logical.js'
import { transformMember } from './Member.js'
import { transformNative } from './Native.js'
import { transformNew } from './New.js'
import { transformObjectConstructor } from './ObjectConstructor.js'
import { transformObjectConstructorAdd } from './ObjectConstructorAdd.js'
import { transformObjectDestructor } from './ObjectDestructor.js'
import { transformObjectDestructorGet } from './ObjectDestructorGet.js'
import { transformObjectDestructorRest } from './ObjectDestructorRest.js'
import { transformObjectSpread } from './ObjectSpread.js'
import { transformReference } from './Reference.js'
import { transformSet } from './Set.js'
import { transformSuper } from './Super.js'
import { transformThrow } from './Throw.js'
import { transformUnary } from './Unary.js'
import { transformValue } from './Value.js'
import { transformWhile } from './While.js'
import { TransformIRContext } from './context.js'

export type TransformIR<N extends IR> = (ir: N, ctx: TransformIRContext) => IR

export const transformIR = visit<TransformIR<IR>>().create('transform', {
    transformArrayAdd,
    transformArrayDestructor,
    transformArrayDestructorGet,
    transformArrayDestructorRest,
    transformArraySpread,
    transformAssign,
    transformBinary,
    transformBlock,
    transformBreak,
    transformCall,
    transformConditional,
    transformDeclare,
    transformDoWhile,
    transformExecute,
    transformForOf,
    transformGet,
    transformJSCall,
    transformLogical,
    transformMember,
    transformNative,
    transformNew,
    transformObjectConstructor,
    transformObjectConstructorAdd,
    transformObjectDestructor,
    transformObjectDestructorGet,
    transformObjectDestructorRest,
    transformObjectSpread,
    transformReference,
    transformSet,
    transformSuper,
    transformThrow,
    transformUnary,
    transformValue,
    transformWhile,
})
