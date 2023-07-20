import { defineLib } from '../shared/define/lib.js'
import { native } from '../shared/native.js'

export type TimeScaleChange = {
    readonly timeScale: number
    readonly scaledTime: number
    readonly startingTime: number
    readonly startingScaledTime: number
}

type TimeScaleChanges = {
    at(time: number): TimeScaleChange
}

export const timeScaleChanges = defineLib<TimeScaleChanges>({
    at: (time) => ({
        time,

        get timeScale() {
            return native.TimeToTimeScale(this.time)
        },
        get scaledTime() {
            return native.TimeToScaledTime(this.time)
        },
        get startingTime() {
            return native.TimeToStartingTime(this.time)
        },
        get startingScaledTime() {
            return native.TimeToStartingScaledTime(this.time)
        },
    }),
})
