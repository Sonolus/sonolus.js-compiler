import { createPointer as _createPointer } from '../../shared/utils/pointer.js'
import { Callback } from '../enums/Callback.js'

const createPointer = _createPointer<Callback>

export const readonlyPointer = createPointer([])

export const preprocessWritablePointer = createPointer(['preprocess'])

export const singleThreadedWritablePointer = createPointer(['preprocess', 'updateSequential'])

export const allWritablePointer = createPointer([
    'preprocess',
    'spawnTime',
    'despawnTime',
    'initialize',
    'updateSequential',
    'updateParallel',
    'terminate',
])
