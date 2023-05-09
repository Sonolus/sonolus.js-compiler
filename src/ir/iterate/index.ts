import { visit } from '../../utils/visitor.js'
import { IR, IRChildren } from '../nodes/index.js'
import { iterateArrayAdd } from './ArrayAdd.js'
import { iterateArrayDestructor } from './ArrayDestructor.js'
import { iterateArrayDestructorGet } from './ArrayDestructorGet.js'
import { iterateArrayDestructorRest } from './ArrayDestructorRest.js'
import { iterateArraySpread } from './ArraySpread.js'
import { iterateAssign } from './Assign.js'
import { iterateBinary } from './Binary.js'
import { iterateBlock } from './Block.js'
import { iterateBreak } from './Break.js'
import { iterateCall } from './Call.js'
import { iterateConditional } from './Conditional.js'
import { iterateDeclare } from './Declare.js'
import { iterateDoWhile } from './DoWhile.js'
import { iterateExecute } from './Execute.js'
import { iterateForOf } from './ForOf.js'
import { iterateGet } from './Get.js'
import { iterateJSCall } from './JSCall.js'
import { iterateLogical } from './Logical.js'
import { iterateMember } from './Member.js'
import { iterateNative } from './Native.js'
import { iterateNew } from './New.js'
import { iterateObjectAdd } from './ObjectAdd.js'
import { iterateObjectConstructor } from './ObjectConstructor.js'
import { iterateObjectDestructor } from './ObjectDestructor.js'
import { iterateObjectDestructorGet } from './ObjectDestructorGet.js'
import { iterateObjectDestructorRest } from './ObjectDestructorRest.js'
import { iterateObjectSpread } from './ObjectSpread.js'
import { iterateReference } from './Reference.js'
import { iterateSet } from './Set.js'
import { iterateSuper } from './Super.js'
import { iterateThrow } from './Throw.js'
import { iterateUnary } from './Unary.js'
import { iterateValue } from './Value.js'
import { iterateWhile } from './While.js'

export type IterateIR<N extends IR> = (ir: N) => IRChildren<N>

export const iterateIR = visit<(ir: IR) => IR[]>().create('iterate', {
    iterateArrayAdd,
    iterateArrayDestructor,
    iterateArrayDestructorGet,
    iterateArrayDestructorRest,
    iterateArraySpread,
    iterateAssign,
    iterateBinary,
    iterateBlock,
    iterateBreak,
    iterateCall,
    iterateConditional,
    iterateDeclare,
    iterateDoWhile,
    iterateExecute,
    iterateForOf,
    iterateGet,
    iterateJSCall,
    iterateLogical,
    iterateMember,
    iterateNative,
    iterateNew,
    iterateObjectAdd,
    iterateObjectConstructor,
    iterateObjectDestructor,
    iterateObjectDestructorGet,
    iterateObjectDestructorRest,
    iterateObjectSpread,
    iterateReference,
    iterateSet,
    iterateSuper,
    iterateThrow,
    iterateUnary,
    iterateValue,
    iterateWhile,
})
