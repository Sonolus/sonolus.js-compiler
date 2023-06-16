import { myMapMerge } from '../../../../utils/MyMap.js'
import { FindInlineState } from './state.js'

export const meetFindInlineStates = (a: FindInlineState, b: FindInlineState): FindInlineState =>
    a === b
        ? a
        : myMapMerge(a, b, (valueA, valueB) => {
              if (valueA === 'T' || valueB === 'T') return 'T'

              if (!valueA || !valueB) return valueA ?? valueB

              return valueA === valueB ? valueA : 'T'
          })
