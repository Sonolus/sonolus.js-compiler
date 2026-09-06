import { myMapMerge } from '../../../../utils/MyMap.js'
import { Set } from '../../../nodes/Set.js'
import { FindInlineState } from './state.js'

export const meetFindInlineStates = (
    a: FindInlineState,
    b: FindInlineState,
    merged: globalThis.Set<Set>,
): FindInlineState =>
    a === b
        ? a
        : myMapMerge(a, b, (valueA, valueB) => {
              if (valueA === 'T' || valueB === 'T') {
                  if (valueA && valueA !== 'T') merged.add(valueA)
                  if (valueB && valueB !== 'T') merged.add(valueB)

                  return 'T'
              }

              if (!valueA || !valueB) return valueA ?? valueB

              if (valueA === valueB) return valueA

              merged.add(valueA)
              merged.add(valueB)

              return 'T'
          })
