import { ForOfStatement } from 'estree'
import { BaseIR, IR } from './index.js'

export type ForOf = BaseIR & {
    type: 'ForOf'
    node: ForOfStatement
    thisValue: unknown
    prototype: unknown
    value: IR
}

export type ForOfChildren = [value: IR]
