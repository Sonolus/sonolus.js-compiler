import { ReadonlyMyMap } from '../../../../utils/MyMap.js'
import { States } from '../../../dataflowAnalysis/state.js'
import { IR } from '../../../nodes/index.js'

export type CountInlineState = {
    readonly refs: ReadonlyMyMap<object, 1 | 'T'>
    readonly counts: ReadonlyMyMap<IR, 1 | 'T'>
}

export type CountInlineStates = States<CountInlineState>
