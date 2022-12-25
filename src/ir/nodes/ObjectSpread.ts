import { BaseIR, IR } from './index.js'

export type ObjectSpread = BaseIR & {
    type: 'ObjectSpread'
    object: object
    arg: IR
}

export type ObjectSpreadChildren = [arg: IR]
