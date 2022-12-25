import { IR } from '../nodes/index.js'

export type States<T> = Map<IR, T>

export type StateOperators<T> = {
    transfer: (ir: IR, input: T) => T
    meet: (a: T, b: T) => T
    compare: (a: T, b: T) => boolean
}
