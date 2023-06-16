import { BaseIR, IR } from './index.js'

export type ObjectDestructorGet = BaseIR & {
    type: 'ObjectDestructorGet'
    target: {
        object: unknown
        keys?: string[]
    }
    key: IR
}

export type ObjectDestructorGetChildren = [key: IR]
