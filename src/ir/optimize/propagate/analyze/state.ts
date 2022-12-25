import { States } from '../../../dataflowAnalysis/state.js'
import { Value } from '../../../nodes/Value.js'

export type PropagateState = ReadonlyMap<object, Value | 'T'>

export type PropagateStates = States<PropagateState>
