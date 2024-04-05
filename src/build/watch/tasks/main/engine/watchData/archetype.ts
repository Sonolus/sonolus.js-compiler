import { EngineWatchDataArchetype } from '@sonolus/core'
import { Archetype } from '../../../../../../lib/watch/Archetype.js'

export const buildArchetypes = (
    archetypes: Record<string, Archetype>,
): EngineWatchDataArchetype[] =>
    Object.values(archetypes).map((archetype) => ({
        name: archetype.name,
        hasInput: archetype.hasInput,
        imports: archetype['_entityImports'],
    }))
