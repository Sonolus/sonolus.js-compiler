import { BaseIR, IR } from './index.js'

export type Call = BaseIR & {
    type: 'Call'
    callee: IR
    args: {
        init: IR
        value: unknown[]
    }
}

export type CallChildren = [callee: IR, init: IR]
