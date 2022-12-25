import { union } from '../../../../utils/set.js'
import { EliminateState } from './state.js'

export const meetEliminateStates = (a: EliminateState, b: EliminateState): EliminateState =>
    union(a, b)
