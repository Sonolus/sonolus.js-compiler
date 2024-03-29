import { visit } from '../../../utils/visitor.js'
import { IR } from '../../nodes/index.js'
import { transformArrayConstructor } from './ArrayConstructor.js'
import { transformArrayConstructorAdd } from './ArrayConstructorAdd.js'
import { transformArrayConstructorSpread } from './ArrayConstructorSpread.js'
import { transformArrayDestructor } from './ArrayDestructor.js'
import { transformArrayDestructorGet } from './ArrayDestructorGet.js'
import { transformArrayDestructorRest } from './ArrayDestructorRest.js'
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
import { transformObjectConstructorSpread } from './ObjectConstructorSpread.js'
import { transformObjectDestructor } from './ObjectDestructor.js'
import { transformObjectDestructorGet } from './ObjectDestructorGet.js'
import { transformObjectDestructorRest } from './ObjectDestructorRest.js'
import { transformReference } from './Reference.js'
import { transformSet } from './Set.js'
import { transformSuper } from './Super.js'
import { transformSwitch } from './Switch.js'
import { transformThrow } from './Throw.js'
import { transformUnary } from './Unary.js'
import { transformValue } from './Value.js'
import { transformWhile } from './While.js'
import { TransformIRContext } from './context.js'

export type TransformIR<N extends IR> = (ir: N, ctx: TransformIRContext) => IR

export const transformIR = visit<TransformIR<IR>>().create('transform', {
    transformArrayConstructor,
    transformArrayConstructorAdd,
    transformArrayConstructorSpread,
    transformArrayDestructor,
    transformArrayDestructorGet,
    transformArrayDestructorRest,
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
    transformObjectConstructorSpread,
    transformObjectDestructor,
    transformObjectDestructorGet,
    transformObjectDestructorRest,
    transformReference,
    transformSet,
    transformSuper,
    transformSwitch,
    transformThrow,
    transformUnary,
    transformValue,
    transformWhile,
})
