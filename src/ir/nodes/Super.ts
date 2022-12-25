import { BaseIR, IR } from './index.js'

export type Super = BaseIR & {
    type: 'Super'
    instance: object
    prototype: unknown
    args: {
        init: IR
        value: unknown[]
    }
}

export type SuperChildren = [init: IR]
