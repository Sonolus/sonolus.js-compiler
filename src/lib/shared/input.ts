import { JudgmentWindows } from '../shared/JudgmentWindows.js'
import { defineLib } from '../shared/define/lib.js'
import { Judgment } from '../shared/enums/Judgment.js'
import { native } from '../shared/native.js'

type Input = {
    judge(hitTime: number, targetTime: number, windows: JudgmentWindows): Judgment
}

export const input = defineLib<Input>({
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
