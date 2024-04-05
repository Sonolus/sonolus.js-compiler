import { defineLib } from '../shared/define/lib.js'
import { preprocessWritablePointer } from './utils/pointer.js'

type Multiplayer = {
    readonly isMultiplayer: number
}

export const multiplayer = defineLib<Multiplayer>({
    isMultiplayer: preprocessWritablePointer(1000, 4, 0, 0),
})
