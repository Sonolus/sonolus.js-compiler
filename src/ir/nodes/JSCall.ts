import { BaseIR, IR } from './index.js'

export type JSCall = BaseIR & {
    type: 'JSCall'
    func: Function
    thisValue: unknown
    args: IR[]
}

export type JSCallChildren = [...args: IR[]]
