import { EnginePreviewDataArchetype } from 'sonolus-core'
import { Archetype } from '../../../../../../lib/play/Archetype.js'

export const buildArchetypes = (
    archetypes: Record<string, Archetype>,
): EnginePreviewDataArchetype[] =>
    Object.values(archetypes).map((archetype) => ({
        name: archetype.name,
        data: archetype['_entityData'],
    }))
