import { BaseIR, IR } from './index.js'

export type ObjectConstructor = BaseIR & {
    type: 'ObjectConstructor'
    object: object
    children: IR[]
}

export type ObjectConstructorChildren = [...children: IR[]]
