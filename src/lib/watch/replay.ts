import { defineLib } from '../shared/define/lib.js'
import { preprocessWritablePointer } from './utils/pointer.js'

type Replay = {
    readonly isReplay: number
}

export const replay = defineLib<Replay>({
    isReplay: preprocessWritablePointer(1000, 4, 0, 0),
})
