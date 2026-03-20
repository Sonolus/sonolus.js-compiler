import { createSafeArea } from '../shared/safeArea.js'
import { preprocessWritablePointer } from './utils/pointer.js'

export const safeArea = createSafeArea(
    preprocessWritablePointer(1000, 2, 0, 0),
    preprocessWritablePointer(1000, 3, 0, 0),
    preprocessWritablePointer(1000, 4, 0, 0),
    preprocessWritablePointer(1000, 5, 0, 0),
)
