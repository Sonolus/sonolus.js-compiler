import { BaseIR, IR } from './index.js'

export type ArrayConstructor = BaseIR & {
    type: 'ArrayConstructor'
    array: unknown[]
    children: IR[]
}

export type ArrayConstructorChildren = [...children: IR[]]
