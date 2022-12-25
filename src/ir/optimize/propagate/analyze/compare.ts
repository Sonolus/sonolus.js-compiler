import { compare } from '../../../../utils/map.js'
import { PropagateState } from './state.js'

export const comparePropagateStates = (a: PropagateState, b: PropagateState): boolean =>
    compare(a, b, (elementA, elementB) => {
        if (elementA === 'T' || elementB === 'T') return elementA === elementB

        return elementA.value === elementB.value
    })
