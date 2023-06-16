import { myMapCompare } from '../../../../utils/MyMap.js'
import { CountInlineState } from './state.js'

export const compareCountInlineStates = (a: CountInlineState, b: CountInlineState): boolean =>
    myMapCompare(a.refs, b.refs, (valueA, valueB) => valueA === valueB) &&
    myMapCompare(a.counts, b.counts, (valueA, valueB) => valueA === valueB)
