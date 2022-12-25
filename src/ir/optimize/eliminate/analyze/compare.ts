import { compare } from '../../../../utils/set.js'
import { EliminateState } from './state.js'

export const compareEliminateStates = (a: EliminateState, b: EliminateState): boolean =>
    compare(a, b)
