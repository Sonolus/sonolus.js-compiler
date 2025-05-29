import { defineLib } from '../shared/define/lib.js'
import { native } from '../shared/native.js'

type Streams = {
    set(id: number, key: number, value: number | boolean): void
}

export const streams = defineLib<Streams>({
    set: native.StreamSet,
})
