import { EnginePlayDataArchetype } from '@sonolus/core'
import { Archetype } from '../../../../../../lib/play/Archetype.js'

export const buildArchetypes = (archetypes: Record<string, Archetype>): EnginePlayDataArchetype[] =>
    Object.values(archetypes).map((archetype) => ({
        name: archetype.name,
        hasInput: archetype.hasInput,
        imports: archetype['_entityImports'],
        exports: archetype['_entityExports'],
    }))
