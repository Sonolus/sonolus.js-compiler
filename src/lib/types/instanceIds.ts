type InstanceId<T extends string> = 0 | (number & { __instanceIdType: T })

export type LoopedEffectClipInstanceId = InstanceId<'LoopedEffectClip'>

export type ScheduledLoopedEffectClipInstanceId = InstanceId<'ScheduledLoopedEffectClip'>

export type ParticleEffectInstanceId = InstanceId<'ParticleEffect'>
