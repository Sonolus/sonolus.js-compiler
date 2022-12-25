import { BaseIR, IR } from './index.js'

export type Break = BaseIR & {
    type: 'Break'
    target: object
    value: IR
}

export type BreakChildren = [value: IR]
