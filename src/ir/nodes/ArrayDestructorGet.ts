import { BaseIR } from './index.js'

export type ArrayDestructorGet = BaseIR & {
    type: 'ArrayDestructorGet'
    elements: unknown[]
}

export type ArrayDestructorGetChildren = []
