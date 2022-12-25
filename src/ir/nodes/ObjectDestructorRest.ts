import { BaseIR } from './index.js'

export type ObjectDestructorRest = BaseIR & {
    type: 'ObjectDestructorRest'
    target: {
        object: unknown
        keys: string[]
    }
}

export type ObjectDestructorRestChildren = []
