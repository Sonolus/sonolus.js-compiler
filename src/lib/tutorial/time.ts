import { defineLib } from '../shared/define/lib.js'
import { readonlyPointer } from './utils/pointer.js'

type Time = {
    readonly now: number
    readonly delta: number
}

export const time = defineLib<Time>({
    now: readonlyPointer(1001, 0, 0, 0),
    delta: readonlyPointer(1001, 1, 0, 0),
})
