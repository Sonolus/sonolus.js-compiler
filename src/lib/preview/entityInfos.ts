import { IR } from '../../ir/nodes/index.js'
import { defineLib } from '../shared/define/lib.js'
import { createEntityInfos } from '../shared/entityInfos.js'
import { readonlyPointer } from './utils/pointer.js'

export type EntityInfo = {
    readonly index: number
    readonly archetype: number
}

const entityInfoPointer = (x: number, index: () => IR) => readonlyPointer(4102, x, index, 2)

export const entityInfos = createEntityInfos<EntityInfo>(
    (index) => entityInfoPointer(0, index),
    (index) =>
        defineLib<EntityInfo>({
            index: entityInfoPointer(0, index),
            archetype: entityInfoPointer(1, index),
        }),
)
