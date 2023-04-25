import { ReadonlyMyMap } from '../../../../utils/MyMap.js'
import { States } from '../../../dataflowAnalysis/state.js'
import { Value } from '../../../nodes/Value.js'

export type PropagateState = ReadonlyMyMap<object, Value | 'T'>

export type PropagateStates = States<PropagateState>
