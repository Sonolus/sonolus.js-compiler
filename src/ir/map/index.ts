import { visit } from '../../utils/visitor.js'
import { IR, IRChildren } from '../nodes/index.js'
import { mapArrayConstructor } from './ArrayConstructor.js'
import { mapArrayConstructorAdd } from './ArrayConstructorAdd.js'
import { mapArrayConstructorSpread } from './ArrayConstructorSpread.js'
import { mapArrayDestructor } from './ArrayDestructor.js'
import { mapArrayDestructorGet } from './ArrayDestructorGet.js'
import { mapArrayDestructorRest } from './ArrayDestructorRest.js'
import { mapAssign } from './Assign.js'
import { mapBinary } from './Binary.js'
import { mapBlock } from './Block.js'
import { mapBreak } from './Break.js'
import { mapCall } from './Call.js'
import { mapConditional } from './Conditional.js'
import { mapDeclare } from './Declare.js'
import { mapDoWhile } from './DoWhile.js'
import { mapExecute } from './Execute.js'
import { mapForOf } from './ForOf.js'
import { mapGet } from './Get.js'
import { mapJSCall } from './JSCall.js'
import { mapLogical } from './Logical.js'
import { mapMember } from './Member.js'
import { mapNative } from './Native.js'
import { mapNew } from './New.js'
import { mapObjectConstructor } from './ObjectConstructor.js'
import { mapObjectConstructorAdd } from './ObjectConstructorAdd.js'
import { mapObjectConstructorSpread } from './ObjectConstructorSpread.js'
import { mapObjectDestructor } from './ObjectDestructor.js'
import { mapObjectDestructorGet } from './ObjectDestructorGet.js'
import { mapObjectDestructorRest } from './ObjectDestructorRest.js'
import { mapReference } from './Reference.js'
import { mapSet } from './Set.js'
import { mapSuper } from './Super.js'
import { mapThrow } from './Throw.js'
import { mapUnary } from './Unary.js'
import { mapValue } from './Value.js'
import { mapWhile } from './While.js'

export type MapIR<N extends IR> = (ir: N, ...children: IR[]) => N

export const mapIR = visit<<N extends IR>(ir: N, ...children: IRChildren<N>) => N>().create('map', {
    mapArrayConstructor,
    mapArrayConstructorAdd,
    mapArrayConstructorSpread,
    mapArrayDestructor,
    mapArrayDestructorGet,
    mapArrayDestructorRest,
    mapAssign,
    mapBinary,
    mapBlock,
    mapBreak,
    mapCall,
    mapConditional,
    mapDeclare,
    mapDoWhile,
    mapExecute,
    mapForOf,
    mapGet,
    mapJSCall,
    mapLogical,
    mapMember,
    mapNative,
    mapNew,
    mapObjectConstructor,
    mapObjectConstructorAdd,
    mapObjectConstructorSpread,
    mapObjectDestructor,
    mapObjectDestructorGet,
    mapObjectDestructorRest,
    mapReference,
    mapSet,
    mapSuper,
    mapThrow,
    mapUnary,
    mapValue,
    mapWhile,
})
