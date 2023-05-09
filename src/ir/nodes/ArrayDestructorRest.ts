import { BaseIR } from './index.js'

export type ArrayDestructorRest = BaseIR & {
    type: 'ArrayDestructorRest'
    target: {
        elements?: unknown[]
    }
}

export type ArrayDestructorRestChildren = []
