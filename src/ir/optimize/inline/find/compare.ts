import { myMapCompare } from '../../../../utils/MyMap.js'
import { FindInlineState } from './state.js'

export const compareFindInlineStates = (a: FindInlineState, b: FindInlineState): boolean =>
    myMapCompare(a, b, (valueA, valueB) => valueA === valueB)
