import { BaseIR, IR } from './index.js'

export type UnaryOperator = '-' | '+' | '!' | '~' | 'typeof'

export type Unary = BaseIR & {
    type: 'Unary'
    operator: UnaryOperator
    arg: IR
}

export type UnaryChildren = [arg: IR]
