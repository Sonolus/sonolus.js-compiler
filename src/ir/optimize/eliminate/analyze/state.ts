import { States } from '../../../dataflowAnalysis/state.js'

export type EliminateState = ReadonlySet<object>

export type EliminateStates = States<EliminateState>
