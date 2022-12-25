import { BaseIR, IR } from './index.js'

export type DoWhile = BaseIR & {
    type: 'DoWhile'
    body: IR
    test: IR
}

export type DoWhileChildren = [body: IR, test: IR]
