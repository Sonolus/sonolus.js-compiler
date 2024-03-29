import { visit } from '../../utils/visitor.js'
import { IR, IRChildren } from '../nodes/index.js'
import { iterateArrayConstructor } from './ArrayConstructor.js'
import { iterateArrayConstructorAdd } from './ArrayConstructorAdd.js'
import { iterateArrayConstructorSpread } from './ArrayConstructorSpread.js'
import { iterateArrayDestructor } from './ArrayDestructor.js'
import { iterateArrayDestructorGet } from './ArrayDestructorGet.js'
import { iterateArrayDestructorRest } from './ArrayDestructorRest.js'
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
import { iterateObjectConstructor } from './ObjectConstructor.js'
import { iterateObjectConstructorAdd } from './ObjectConstructorAdd.js'
import { iterateObjectConstructorSpread } from './ObjectConstructorSpread.js'
import { iterateObjectDestructor } from './ObjectDestructor.js'
import { iterateObjectDestructorGet } from './ObjectDestructorGet.js'
import { iterateObjectDestructorRest } from './ObjectDestructorRest.js'
import { iterateReference } from './Reference.js'
import { iterateSet } from './Set.js'
import { iterateSuper } from './Super.js'
import { iterateSwitch } from './Switch.js'
import { iterateThrow } from './Throw.js'
import { iterateUnary } from './Unary.js'
import { iterateValue } from './Value.js'
import { iterateWhile } from './While.js'

export type IterateIR<N extends IR> = (ir: N) => IRChildren<N>

export const iterateIR = visit<(ir: IR) => IR[]>().create('iterate', {
    iterateArrayConstructor,
    iterateArrayConstructorAdd,
    iterateArrayConstructorSpread,
    iterateArrayDestructor,
    iterateArrayDestructorGet,
    iterateArrayDestructorRest,
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
    iterateObjectConstructor,
    iterateObjectConstructorAdd,
    iterateObjectConstructorSpread,
    iterateObjectDestructor,
    iterateObjectDestructorGet,
    iterateObjectDestructorRest,
    iterateReference,
    iterateSet,
    iterateSuper,
    iterateSwitch,
    iterateThrow,
    iterateUnary,
    iterateValue,
    iterateWhile,
})
