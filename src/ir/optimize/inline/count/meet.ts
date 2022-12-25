import { merge } from '../../../../utils/map.js'
import { CountInlineState } from './state.js'

export const meetCountInlineStates = (
    a: CountInlineState,
    b: CountInlineState,
): CountInlineState => ({
    refs: merge(a.refs, b.refs, (valueA, valueB) => {
        if (valueA === 'T' || valueB === 'T') return 'T'

        return valueA ?? valueB
    }),
    counts: merge(a.counts, b.counts, (valueA, valueB) => {
        if (valueA === 'T' || valueB === 'T') return 'T'

        return valueA ?? valueB
    }),
})
