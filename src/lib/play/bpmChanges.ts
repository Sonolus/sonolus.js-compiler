import { defineLib } from '../shared/define/lib.js'
import { native } from '../shared/native.js'

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
            return native.BeatToBPM(this.beat)
        },
        get time() {
            return native.BeatToTime(this.beat)
        },
        get startingBeat() {
            return native.BeatToStartingBeat(this.beat)
        },
        get startingTime() {
            return native.BeatToStartingTime(this.beat)
        },
    }),
})
