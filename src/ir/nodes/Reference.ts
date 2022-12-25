import { BaseIR } from './index.js'

export type Reference = BaseIR & {
    type: 'Reference'
    name: string
}

export type ReferenceChildren = []
