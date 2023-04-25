import { ReadonlyMyMap } from '../../../../utils/MyMap.js'
import { States } from '../../../dataflowAnalysis/state.js'
import { Set } from '../../../nodes/Set.js'

export type FindInlineState = ReadonlyMyMap<object, Set | 'T'>

export type FindInlineStates = States<FindInlineState>
