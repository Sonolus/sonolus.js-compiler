import { BaseIR, IR } from './index.js'

export type New = BaseIR & {
    type: 'New'
    callee: IR
    args: IR
}

export type NewChildren = [callee: IR, args: IR]
