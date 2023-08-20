import { StackTrace } from '../../utils/CompilerError.js'
import { Env } from '../env/index.js'
import { ArrayConstructor, ArrayConstructorChildren } from './ArrayConstructor.js'
import { ArrayConstructorAdd, ArrayConstructorAddChildren } from './ArrayConstructorAdd.js'
import { ArrayConstructorSpread, ArrayConstructorSpreadChildren } from './ArrayConstructorSpread.js'
import { ArrayDestructor, ArrayDestructorChildren } from './ArrayDestructor.js'
import { ArrayDestructorGet, ArrayDestructorGetChildren } from './ArrayDestructorGet.js'
import { ArrayDestructorRest, ArrayDestructorRestChildren } from './ArrayDestructorRest.js'
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
import { ObjectConstructor, ObjectConstructorChildren } from './ObjectConstructor.js'
import { ObjectConstructorAdd, ObjectConstructorAddChildren } from './ObjectConstructorAdd.js'
import {
    ObjectConstructorSpread,
    ObjectConstructorSpreadChildren,
} from './ObjectConstructorSpread.js'
import { ObjectDestructor, ObjectDestructorChildren } from './ObjectDestructor.js'
import { ObjectDestructorGet, ObjectDestructorGetChildren } from './ObjectDestructorGet.js'
import { ObjectDestructorRest, ObjectDestructorRestChildren } from './ObjectDestructorRest.js'
import { Reference, ReferenceChildren } from './Reference.js'
import { Set, SetChildren } from './Set.js'
import { Super, SuperChildren } from './Super.js'
import { Switch, SwitchChildren } from './Switch.js'
import { Throw, ThrowChildren } from './Throw.js'
import { Unary, UnaryChildren } from './Unary.js'
import { Value, ValueChildren } from './Value.js'
import { While, WhileChildren } from './While.js'

export type BaseIR = {
    readonly stackTraces: StackTrace[]
    readonly env: Env
}

export type IR =
    | ArrayConstructor
    | ArrayConstructorAdd
    | ArrayConstructorSpread
    | ArrayDestructor
    | ArrayDestructorGet
    | ArrayDestructorRest
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
    | ObjectConstructor
    | ObjectConstructorAdd
    | ObjectConstructorSpread
    | ObjectDestructor
    | ObjectDestructorGet
    | ObjectDestructorRest
    | Reference
    | Set
    | Super
    | Switch
    | Throw
    | Unary
    | Value
    | While

export type IRChildren<N extends IR> = {
    ArrayConstructor: ArrayConstructorChildren
    ArrayConstructorAdd: ArrayConstructorAddChildren
    ArrayConstructorSpread: ArrayConstructorSpreadChildren
    ArrayDestructor: ArrayDestructorChildren
    ArrayDestructorGet: ArrayDestructorGetChildren
    ArrayDestructorRest: ArrayDestructorRestChildren
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
    ObjectConstructor: ObjectConstructorChildren
    ObjectConstructorAdd: ObjectConstructorAddChildren
    ObjectConstructorSpread: ObjectConstructorSpreadChildren
    ObjectDestructor: ObjectDestructorChildren
    ObjectDestructorGet: ObjectDestructorGetChildren
    ObjectDestructorRest: ObjectDestructorRestChildren
    Reference: ReferenceChildren
    Set: SetChildren
    Super: SuperChildren
    Switch: SwitchChildren
    Throw: ThrowChildren
    Unary: UnaryChildren
    Value: ValueChildren
    While: WhileChildren
}[N['type']]

export const IRTypes = [
    'ArrayConstructor',
    'ArrayConstructorAdd',
    'ArrayConstructorSpread',
    'ArrayDestructor',
    'ArrayDestructorGet',
    'ArrayDestructorRest',
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
    'ObjectConstructor',
    'ObjectConstructorAdd',
    'ObjectConstructorSpread',
    'ObjectDestructor',
    'ObjectDestructorGet',
    'ObjectDestructorRest',
    'Reference',
    'Set',
    'Super',
    'Switch',
    'Throw',
    'Unary',
    'Value',
    'While',
] satisfies IR['type'][]
