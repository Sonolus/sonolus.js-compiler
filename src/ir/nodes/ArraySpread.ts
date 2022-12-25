import { BaseIR, IR } from './index.js'

export type ArraySpread = BaseIR & {
    type: 'ArraySpread'
    array: unknown[]
    arg: IR
}

export type ArraySpreadChildren = [arg: IR]
