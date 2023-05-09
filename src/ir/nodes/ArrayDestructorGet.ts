import { BaseIR } from './index.js'

export type ArrayDestructorGet = BaseIR & {
    type: 'ArrayDestructorGet'
    target: {
        elements?: unknown[]
    }
}

export type ArrayDestructorGetChildren = []
