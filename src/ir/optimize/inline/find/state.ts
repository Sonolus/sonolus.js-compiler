import { States } from '../../../dataflowAnalysis/state.js'
import { Set } from '../../../nodes/Set.js'

export type FindInlineState = ReadonlyMap<object, Set | 'T'>

export type FindInlineStates = States<FindInlineState>
