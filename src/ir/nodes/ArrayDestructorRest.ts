import { BaseIR } from './index.js'

export type ArrayDestructorRest = BaseIR & {
    type: 'ArrayDestructorRest'
    elements: unknown[]
}

export type ArrayDestructorRestChildren = []
