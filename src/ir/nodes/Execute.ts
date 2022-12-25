import { BaseIR, IR } from './index.js'

export type Execute = BaseIR & {
    type: 'Execute'
    children: IR[]
}

export type ExecuteChildren = [...children: IR[]]
