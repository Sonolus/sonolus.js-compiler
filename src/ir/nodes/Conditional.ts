import { BaseIR, IR } from './index.js'

export type Conditional = BaseIR & {
    type: 'Conditional'
    test: IR
    consequent: IR
    alternate: IR
}

export type ConditionalChildren = [test: IR, consequent: IR, alternate: IR]
