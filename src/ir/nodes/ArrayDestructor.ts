import { BaseIR, IR } from './index.js'

export type ArrayDestructor = BaseIR & {
    type: 'ArrayDestructor'
    array: IR
    target: {
        elements?: unknown[]
    }
}

export type ArrayDestructorChildren = [array: IR]
