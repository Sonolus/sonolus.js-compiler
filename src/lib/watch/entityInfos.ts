import { IR } from '../../ir/nodes/index.js'
import { defineLib } from '../shared/define/lib.js'
import { createEntityInfos } from '../shared/entityInfos.js'
import { EntityState } from './enums/EntityState.js'
import { readonlyPointer } from './utils/pointer.js'

export type EntityInfo = {
    readonly index: number
    readonly archetype: number
    readonly state: EntityState
}

const entityInfoPointer = (x: number, index: () => IR) => readonlyPointer(4103, x, index, 3)

export const entityInfos = createEntityInfos<EntityInfo>(
    (index) => entityInfoPointer(0, index),
    (index) =>
        defineLib<EntityInfo>({
            index: entityInfoPointer(0, index),
            archetype: entityInfoPointer(1, index),
            state: entityInfoPointer(2, index),
        }),
)
