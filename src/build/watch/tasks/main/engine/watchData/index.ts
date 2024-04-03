import { EngineWatchData } from '@sonolus/core'
import { buildBuckets } from '../../../../../shared/tasks/main/engine/data/buckets.js'
import { Project } from '../../../../project.js'
import { buildArchetypes } from './archetype.js'
import { buildEffect } from './effect.js'
import { buildParticle } from './particle.js'
import { buildSkin } from './skin.js'

export const buildEngineWatchData = (
    watchData: Project['engine']['watchData'],
): EngineWatchData => ({
    skin: buildSkin(watchData.skin),
    effect: buildEffect(watchData.effect),
    particle: buildParticle(watchData.particle),
    buckets: buildBuckets(watchData.buckets),
    archetypes: buildArchetypes(watchData.archetypes),
    updateSpawn: -1,
    nodes: [],
})
