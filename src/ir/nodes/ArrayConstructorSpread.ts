import { BaseIR, IR } from './index.js'

export type ArrayConstructorSpread = BaseIR & {
    type: 'ArrayConstructorSpread'
    array: unknown[]
    arg: IR
}

export type ArrayConstructorSpreadChildren = [arg: IR]
