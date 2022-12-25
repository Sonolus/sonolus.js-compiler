import { BaseIR, IR } from './index.js'

export type Throw = BaseIR & {
    type: 'Throw'
    arg: IR
}

export type ThrowChildren = [arg: IR]
