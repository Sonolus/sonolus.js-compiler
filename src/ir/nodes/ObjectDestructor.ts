import { BaseIR, IR } from './index.js'

export type ObjectDestructor = BaseIR & {
    type: 'ObjectDestructor'
    object: IR
    target: {
        object: unknown
        keys?: string[]
    }
}

export type ObjectDestructorChildren = [object: IR]
