type Id<T extends string> = number & { __idType: T }

export type SkinSpriteId = Id<'SkinSprite'>

export type EffectClipId = Id<'EffectClip'>

export type ParticleEffectId = Id<'ParticleEffect'>
