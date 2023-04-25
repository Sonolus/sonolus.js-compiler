import { EffectClipName } from 'sonolus-core'
import { EffectClipId } from '../ids/EffectClipId.js'
import { LoopedEffectClipInstanceId } from '../instanceIds/LoopedEffectClipInstanceId.js'
import { ScheduledLoopedEffectClipInstanceId } from '../instanceIds/ScheduledLoopedEffectClipInstanceId.js'
import { native } from '../native.js'
import { defineLib } from './lib.js'

export type EffectClip = {
    readonly name: string
    readonly id: number
    readonly exists: boolean

    play(distance: number): void
    loop(): LoopedEffectClipInstanceId
    schedule(time: number, distance: number): void
    scheduleLoop(startTime: number): ScheduledLoopedEffectClipInstanceId
}

type EffectDefinition = {
    clips: Record<string, EffectClipName | (string & {})>
}

type EffectClips = {
    exists(id: EffectClipId): boolean
    play(id: EffectClipId, distance: number): void
    loop(id: EffectClipId): LoopedEffectClipInstanceId
    schedule(id: EffectClipId, time: number, distance: number): void
    scheduleLoop(id: EffectClipId, startTime: number): ScheduledLoopedEffectClipInstanceId
    stopLoop(id: LoopedEffectClipInstanceId): void
    scheduleStopLoop(id: ScheduledLoopedEffectClipInstanceId, endTime: number): void
}

type Effect<T extends EffectDefinition> = {
    clips: { readonly name: string; readonly id: number }[] & {
        [K in keyof T['clips']]: EffectClip
    } & EffectClips
}

export const defineEffect = <T extends EffectDefinition>(effect: T): Effect<T> =>
    defineLib<Effect<T>>({
        clips: Object.assign(
            Object.values(effect.clips).map((name, id) => ({ name, id })),
            Object.fromEntries(
                Object.entries(effect.clips).map(([key, name], id) => [
                    key,
                    defineLib<EffectClip>({
                        name: name as never,
                        id,
                        get exists() {
                            return native.HasEffectClip(this.id)
                        },

                        play(this: EffectClip, distance) {
                            native.Play(this.id, distance)
                        },
                        loop(this: EffectClip) {
                            return native.PlayLooped(this.id) as never
                        },
                        schedule(this: EffectClip, time, distance) {
                            native.PlayScheduled(this.id, time, distance)
                        },
                        scheduleLoop(this: EffectClip, startTime) {
                            return native.PlayLoopedScheduled(this.id, startTime) as never
                        },
                    }),
                ]),
            ),
            defineLib<EffectClips>({
                exists(id) {
                    return native.HasEffectClip(id)
                },
                play(id, distance) {
                    native.Play(id, distance)
                },
                loop(id) {
                    return native.PlayLooped(id) as never
                },
                schedule(id, time, distance) {
                    native.PlayScheduled(id, time, distance)
                },
                scheduleLoop(id, startTime) {
                    return native.PlayLoopedScheduled(id, startTime) as never
                },
                stopLoop(id) {
                    native.StopLooped(id)
                },
                scheduleStopLoop(id, endTime) {
                    native.StopLoopedScheduled(id, endTime)
                },
            }),
        ) as never,
    })
