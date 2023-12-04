import { defineLib } from './define/lib.js'
import { native } from './native.js'

export type BpmChange = {
    readonly bpm: number
    readonly time: number
    readonly startingBeat: number
    readonly startingTime: number
}

type BpmChanges = {
    at(beat: number): BpmChange
}

export const bpmChanges = defineLib<BpmChanges>({
    at: (beat) => ({
        beat,

        get bpm() {
            return native.BeatToBPM(this.beat as number)
        },
        get time() {
            return native.BeatToTime(this.beat as number)
        },
        get startingBeat() {
            return native.BeatToStartingBeat(this.beat as number)
        },
        get startingTime() {
            return native.BeatToStartingTime(this.beat as number)
        },
    }),
})
