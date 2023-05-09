import { BaseIR, IR } from './index.js'

export type ObjectConstructorAddKind = 'init' | 'get' | 'set'

export type ObjectConstructorAdd = BaseIR & {
    type: 'ObjectConstructorAdd'
    object: object
    kind: ObjectConstructorAddKind
    key: IR
    value: IR
}

export type ObjectConstructorAddChildren = [key: IR, value: IR]
