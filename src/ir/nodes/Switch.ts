import { BaseIR, IR } from './index.js'

export type Switch = BaseIR & {
    type: 'Switch'
    discriminant: IR
    defaultCase: IR
    cases: {
        test: IR
        consequent: IR
    }[]
}

export type SwitchChildren = [discriminant: IR, defaultCase: IR, ...casePairs: IR[]]
