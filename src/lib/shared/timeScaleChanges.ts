import { defineLib } from './define/lib.js'
import { native } from './native.js'

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
            return native.TimeToTimeScale(this.time as number)
        },
        get scaledTime() {
            return native.TimeToScaledTime(this.time as number)
        },
        get startingTime() {
            return native.TimeToStartingTime(this.time as number)
        },
        get startingScaledTime() {
            return native.TimeToStartingScaledTime(this.time as number)
        },
    }),
})
