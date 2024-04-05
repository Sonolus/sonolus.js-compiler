import { EngineTutorialData } from '@sonolus/core'
import { Project } from '../../../../project.js'
import { buildEffect } from './effect.js'
import { buildInstruction } from './instruction.js'
import { buildParticle } from './particle.js'
import { buildSkin } from './skin.js'

export const buildEngineTutorialData = (
    tutorialData: Project['engine']['tutorialData'],
): EngineTutorialData => ({
    skin: buildSkin(tutorialData.skin),
    effect: buildEffect(tutorialData.effect),
    particle: buildParticle(tutorialData.particle),
    instruction: buildInstruction(tutorialData.instruction),
    nodes: [],
})
