import { defineLib } from './define/lib.js'
import { native } from './native.js'
import { preprocessWritablePointer } from './utils/pointer.js'

type Debug = {
    readonly enabled: boolean

    log(value: number | boolean): void
    pause(): void
}

export const debug = defineLib<Debug>({
    enabled: preprocessWritablePointer(1000, 0, 0, 0),

    log: native.DebugLog,
    pause: native.DebugPause,
})
