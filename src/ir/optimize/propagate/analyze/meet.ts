import { merge } from '../../../../utils/map.js'
import { PropagateState } from './state.js'

export const meetPropagateStates = (a: PropagateState, b: PropagateState): PropagateState =>
    merge(a, b, (elementA, elementB) => {
        if (elementA === 'T' || elementB === 'T') return 'T'

        if (!elementA || !elementB) return elementA ?? elementB

        return elementA.value === elementB.value ? elementA : 'T'
    })
