import { BaseIR, IR } from './index.js'

export type Declare = BaseIR & {
    type: 'Declare'
    name: string
    value: IR
}

export type DeclareChildren = [value: IR]
