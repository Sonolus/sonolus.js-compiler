import { createPointer as _createPointer } from '../../shared/utils/pointer.js'
import { TutorialCallback } from '../enums/TutorialCallback.js'

const createPointer = _createPointer<TutorialCallback>

export const readonlyPointer = createPointer([])

export const preprocessWritablePointer = createPointer(['preprocess'])

export const allWritablePointer = createPointer(['preprocess', 'navigate', 'update'])
