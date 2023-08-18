import { ArchetypeCallback } from '../../play/index.js'
import { createPointer as _createPointer } from '../../shared/utils/pointer.js'

const createPointer = _createPointer<ArchetypeCallback>

export const readonlyPointer = createPointer([])

export const preprocessWritablePointer = createPointer(['preprocess'])

export const singleThreadedWritablePointer = createPointer([
    'preprocess',
    'updateSequential',
    'touch',
])

export const allWritablePointer = createPointer([
    'preprocess',
    'spawnOrder',
    'shouldSpawn',
    'initialize',
    'updateSequential',
    'touch',
    'updateParallel',
    'terminate',
])
