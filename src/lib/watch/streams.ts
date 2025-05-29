import { defineLib } from '../shared/define/lib.js'
import { native } from '../shared/native.js'

type Streams = {
    has(id: number, key: number): boolean
    getPreviousKey(id: number, key: number): number
    getNextKey(id: number, key: number): number
    getValue(id: number, key: number): number
}

export const streams = defineLib<Streams>({
    has: native.StreamHas,
    getPreviousKey: native.StreamGetPreviousKey,
    getNextKey: native.StreamGetNextKey,
    getValue: native.StreamGetValue,
})
