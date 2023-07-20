import { EnginePlayData } from 'sonolus-core'
import { Project } from '../../../../project.js'
import { buildArchetypes } from './archetype.js'
import { buildBuckets } from './buckets.js'
import { buildEffect } from './effect.js'
import { buildParticle } from './particle.js'
import { buildSkin } from './skin.js'

export const buildEngineData = (data: Project['engine']['playData']): EnginePlayData => ({
    skin: buildSkin(data.skin),
    effect: buildEffect(data.effect),
    particle: buildParticle(data.particle),
    buckets: buildBuckets(data.buckets),
    archetypes: buildArchetypes(data.archetypes),
    nodes: [],
})
