import { BaseIR, IR } from './index.js'

export type ObjectAddKind = 'init' | 'get' | 'set'

export type ObjectAdd = BaseIR & {
    type: 'ObjectAdd'
    object: object
    kind: ObjectAddKind
    key: IR
    value: IR
}

export type ObjectAddChildren = [key: IR, value: IR]
