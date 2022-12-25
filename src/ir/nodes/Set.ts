import { BaseIR, IR } from './index.js'

export type Set = BaseIR & {
    type: 'Set'
    target: object
    value: IR
}

export type SetChildren = [value: IR]
