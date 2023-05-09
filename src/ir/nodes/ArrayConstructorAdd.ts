import { BaseIR, IR } from './index.js'

export type ArrayConstructorAdd = BaseIR & {
    type: 'ArrayConstructorAdd'
    array: unknown[]
    value: IR
}

export type ArrayConstructorAddChildren = [value: IR]
