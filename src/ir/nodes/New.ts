import { BaseIR, IR } from './index.js'

export type New = BaseIR & {
    type: 'New'
    callee: IR
    args: {
        init: IR
        value: unknown[]
    }
}

export type NewChildren = [callee: IR, init: IR]
