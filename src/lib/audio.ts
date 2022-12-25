import { defineLib } from './define/lib.js'
import { preprocessWritablePointer } from './utils/pointer.js'

type Audio = {
    readonly offset: number
}

export const audio = defineLib<Audio>({
    offset: preprocessWritablePointer(1000, 2, 0, 0),
})
