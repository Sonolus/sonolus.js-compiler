import { BaseIR, IR } from './index.js'

export type While = BaseIR & {
    type: 'While'
    test: IR
    body: IR
}

export type WhileChildren = [test: IR, body: IR]
