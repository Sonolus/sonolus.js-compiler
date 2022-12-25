import { EngineDataArchetype } from 'sonolus-core'
import { Archetype } from '../../../../../lib/Archetype.js'

export const buildArchetypes = (archetypes: Record<string, Archetype>): EngineDataArchetype[] =>
    Object.values(archetypes).map((archetype) => ({
        name: archetype.name,
        hasInput: archetype.hasInput,
        data: archetype['_entityData'],
    }))
