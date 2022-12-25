import { BaseIR, IR } from './index.js'

export type Block = BaseIR & {
    type: 'Block'
    target: object
    body: IR
}

export type BlockChildren = [body: IR]
