import { BaseIR } from './index.js'

export type Value = BaseIR & {
    type: 'Value'
    value: unknown
    thisValue: unknown
    isSuper: boolean
}

export type ValueChildren = []
