import { compare } from '../../../../utils/map.js'
import { CountInlineState } from './state.js'

export const compareCountInlineStates = (a: CountInlineState, b: CountInlineState): boolean =>
    compare(a.refs, b.refs, (valueA, valueB) => valueA === valueB) &&
    compare(a.counts, b.counts, (valueA, valueB) => valueA === valueB)
