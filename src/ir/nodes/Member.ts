import { BaseIR, IR } from './index.js'

export type Member = BaseIR & {
    type: 'Member'
    object: IR
    key: IR
}

export type MemberChildren = [object: IR, key: IR]
