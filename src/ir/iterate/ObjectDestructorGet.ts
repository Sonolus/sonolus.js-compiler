import { ObjectDestructorGet } from '../nodes/ObjectDestructorGet.js'
import { IterateIR } from './index.js'

export const iterateObjectDestructorGet: IterateIR<ObjectDestructorGet> = (ir) => [ir.key]
