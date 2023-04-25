import { myMapMerge } from '../../../../utils/MyMap.js'
import { CountInlineState } from './state.js'

export const meetCountInlineStates = (
    a: CountInlineState,
    b: CountInlineState,
): CountInlineState => ({
    refs: myMapMerge(a.refs, b.refs, (valueA, valueB) => {
        if (valueA === 'T' || valueB === 'T') return 'T'

        return valueA ?? valueB
    }),
    counts: myMapMerge(a.counts, b.counts, (valueA, valueB) => {
        if (valueA === 'T' || valueB === 'T') return 'T'

        return valueA ?? valueB
    }),
})
