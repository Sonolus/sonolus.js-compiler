import { BaseIR, IR } from './index.js'

export type ArrayAdd = BaseIR & {
    type: 'ArrayAdd'
    array: unknown[]
    value: IR
}

export type ArrayAddChildren = [value: IR]
