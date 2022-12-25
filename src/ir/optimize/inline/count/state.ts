import { States } from '../../../dataflowAnalysis/state.js'
import { IR } from '../../../nodes/index.js'

export type CountInlineState = {
    readonly refs: ReadonlyMap<object, 1 | 'T'>
    readonly counts: ReadonlyMap<IR, 1 | 'T'>
}

export type CountInlineStates = States<CountInlineState>
