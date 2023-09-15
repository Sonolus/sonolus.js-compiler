import { EnginePreviewData } from 'sonolus-core'
import { Project } from '../../../../project.js'
import { buildArchetypes } from './archetype.js'
import { buildSkin } from './skin.js'

export const buildEnginePreviewData = (
    previewData: Project['engine']['previewData'],
): EnginePreviewData => ({
    skin: buildSkin(previewData.skin),
    archetypes: buildArchetypes(previewData.archetypes),
    nodes: [],
})
