import { StackTrace } from '../../utils/CompilerError.js'
import { Env } from '../env/index.js'
import { ArrayAdd, ArrayAddChildren } from './ArrayAdd.js'
import { ArrayDestructor, ArrayDestructorChildren } from './ArrayDestructor.js'
import { ArrayDestructorGet, ArrayDestructorGetChildren } from './ArrayDestructorGet.js'
import { ArrayDestructorRest, ArrayDestructorRestChildren } from './ArrayDestructorRest.js'
import { ArraySpread, ArraySpreadChildren } from './ArraySpread.js'
import { Assign, AssignChildren } from './Assign.js'
import { Binary, BinaryChildren } from './Binary.js'
import { Block, BlockChildren } from './Block.js'
import { Break, BreakChildren } from './Break.js'
import { Call, CallChildren } from './Call.js'
import { Conditional, ConditionalChildren } from './Conditional.js'
import { Declare, DeclareChildren } from './Declare.js'
import { DoWhile, DoWhileChildren } from './DoWhile.js'
import { Execute, ExecuteChildren } from './Execute.js'
import { ForOf, ForOfChildren } from './ForOf.js'
import { Get, GetChildren } from './Get.js'
import { JSCall, JSCallChildren } from './JSCall.js'
import { Logical, LogicalChildren } from './Logical.js'
import { Member, MemberChildren } from './Member.js'
import { Native, NativeChildren } from './Native.js'
import { New, NewChildren } from './New.js'
import { ObjectAdd, ObjectAddChildren } from './ObjectAdd.js'
import { ObjectDestructor, ObjectDestructorChildren } from './ObjectDestructor.js'
import { ObjectDestructorGet, ObjectDestructorGetChildren } from './ObjectDestructorGet.js'
import { ObjectDestructorRest, ObjectDestructorRestChildren } from './ObjectDestructorRest.js'
import { ObjectSpread, ObjectSpreadChildren } from './ObjectSpread.js'
import { Reference, ReferenceChildren } from './Reference.js'
import { Set, SetChildren } from './Set.js'
import { Super, SuperChildren } from './Super.js'
import { Throw, ThrowChildren } from './Throw.js'
import { Unary, UnaryChildren } from './Unary.js'
import { Value, ValueChildren } from './Value.js'
import { While, WhileChildren } from './While.js'

export type BaseIR = {
    readonly stackTraces: StackTrace[]
    readonly env: Env
}

export type IR =
    | ArrayAdd
    | ArrayDestructor
    | ArrayDestructorGet
    | ArrayDestructorRest
    | ArraySpread
    | Assign
    | Binary
    | Block
    | Break
    | Call
    | Conditional
    | Declare
    | DoWhile
    | Execute
    | ForOf
    | Get
    | JSCall
    | Logical
    | Member
    | Native
    | New
    | ObjectAdd
    | ObjectDestructor
    | ObjectDestructorGet
    | ObjectDestructorRest
    | ObjectSpread
    | Reference
    | Set
    | Super
    | Throw
    | Unary
    | Value
    | While

export type IRChildren<N extends IR> = {
    ArrayAdd: ArrayAddChildren
    ArrayDestructor: ArrayDestructorChildren
    ArrayDestructorGet: ArrayDestructorGetChildren
    ArrayDestructorRest: ArrayDestructorRestChildren
    ArraySpread: ArraySpreadChildren
    Assign: AssignChildren
    Binary: BinaryChildren
    Block: BlockChildren
    Break: BreakChildren
    Call: CallChildren
    Conditional: ConditionalChildren
    Declare: DeclareChildren
    DoWhile: DoWhileChildren
    Execute: ExecuteChildren
    ForOf: ForOfChildren
    Get: GetChildren
    JSCall: JSCallChildren
    Logical: LogicalChildren
    Member: MemberChildren
    Native: NativeChildren
    New: NewChildren
    ObjectAdd: ObjectAddChildren
    ObjectDestructor: ObjectDestructorChildren
    ObjectDestructorGet: ObjectDestructorGetChildren
    ObjectDestructorRest: ObjectDestructorRestChildren
    ObjectSpread: ObjectSpreadChildren
    Reference: ReferenceChildren
    Set: SetChildren
    Super: SuperChildren
    Throw: ThrowChildren
    Unary: UnaryChildren
    Value: ValueChildren
    While: WhileChildren
}[N['type']]

export const IRTypes = [
    'ArrayAdd',
    'ArrayDestructor',
    'ArrayDestructorGet',
    'ArrayDestructorRest',
    'ArraySpread',
    'Assign',
    'Binary',
    'Block',
    'Break',
    'Call',
    'Conditional',
    'Declare',
    'DoWhile',
    'Execute',
    'ForOf',
    'Get',
    'JSCall',
    'Logical',
    'Member',
    'Native',
    'New',
    'ObjectAdd',
    'ObjectDestructor',
    'ObjectDestructorGet',
    'ObjectDestructorRest',
    'ObjectSpread',
    'Reference',
    'Set',
    'Super',
    'Throw',
    'Unary',
    'Value',
    'While',
] satisfies IR['type'][]
