import { BaseIR, IR } from './index.js'

export type Super = BaseIR & {
    type: 'Super'
    instance: object
    prototype: unknown
    args: IR
}

export type SuperChildren = [args: IR]
