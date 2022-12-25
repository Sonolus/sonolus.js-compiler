import { merge } from '../../../../utils/map.js'
import { FindInlineState } from './state.js'

export const meetFindInlineStates = (a: FindInlineState, b: FindInlineState): FindInlineState =>
    merge(a, b, (valueA, valueB) => {
        if (valueA === 'T' || valueB === 'T') return 'T'

        if (!valueA || !valueB) return valueA ?? valueB

        return valueA === valueB ? valueA : 'T'
    })
