import { BaseIR } from './index.js'

export type Get = BaseIR & {
    type: 'Get'
    target: object
}

export type GetChildren = []
