import { JudgmentWindows } from './JudgmentWindows.js'
import { defineLib } from './define/lib.js'
import { Judgment } from './enums/Judgment.js'
import { native } from './native.js'
import { preprocessWritablePointer } from './utils/pointer.js'

type Input = {
    readonly offset: number

    judge(hitTime: number, targetTime: number, windows: JudgmentWindows): Judgment
}

export const input = defineLib<Input>({
    offset: preprocessWritablePointer(1000, 3, 0, 0),

    judge(hitTime, targetTime, windows) {
        return native.Judge(
            hitTime,
            targetTime,
            windows.perfect.min,
            windows.perfect.max,
            windows.great.min,
            windows.great.max,
            windows.good.min,
            windows.good.max,
        ) as never
    },
})
