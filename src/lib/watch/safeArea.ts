import { createSafeArea } from '../shared/safeArea.js'
import { preprocessWritablePointer } from './utils/pointer.js'

export const safeArea = createSafeArea(
    preprocessWritablePointer(1000, 5, 0, 0),
    preprocessWritablePointer(1000, 6, 0, 0),
    preprocessWritablePointer(1000, 7, 0, 0),
    preprocessWritablePointer(1000, 8, 0, 0),
)
