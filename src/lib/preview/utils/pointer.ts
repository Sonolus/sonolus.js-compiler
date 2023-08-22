import { createPointer as _createPointer } from '../../shared/utils/pointer.js'
import { ArchetypeCallback } from '../enums/ArchetypeCallback.js'

const createPointer = _createPointer<ArchetypeCallback>

export const readonlyPointer = createPointer([])

export const preprocessWritablePointer = createPointer(['preprocess'])

export const allWritablePointer = createPointer(['preprocess', 'render'])
