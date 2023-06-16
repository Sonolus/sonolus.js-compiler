import { BaseIR, IR } from './index.js'

export type ObjectConstructorSpread = BaseIR & {
    type: 'ObjectConstructorSpread'
    object: object
    arg: IR
}

export type ObjectConstructorSpreadChildren = [arg: IR]
