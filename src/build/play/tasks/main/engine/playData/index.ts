import { EnginePlayData } from '@sonolus/core'
import { buildBuckets } from '../../../../../shared/tasks/main/engine/data/buckets.js'
import { Project } from '../../../../project.js'
import { buildArchetypes } from './archetype.js'
import { buildEffect } from './effect.js'
import { buildParticle } from './particle.js'
import { buildSkin } from './skin.js'

export const buildEnginePlayData = (playData: Project['engine']['playData']): EnginePlayData => ({
    skin: buildSkin(playData.skin),
    effect: buildEffect(playData.effect),
    particle: buildParticle(playData.particle),
    buckets: buildBuckets(playData.buckets),
    archetypes: buildArchetypes(playData.archetypes),
    nodes: [],
})
