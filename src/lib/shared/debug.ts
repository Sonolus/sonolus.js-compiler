import { defineLib } from '../shared/define/lib.js'
import { native } from '../shared/native.js'
import { Pointer } from './utils/pointer.js'

type Debug = {
    readonly enabled: boolean

    log(value: number | boolean): void
    pause(): void
}

export const createDebug = (enabled: Pointer): Debug =>
    defineLib<Debug>({
        enabled,

        log: native.DebugLog,
        pause: native.DebugPause,
    })
