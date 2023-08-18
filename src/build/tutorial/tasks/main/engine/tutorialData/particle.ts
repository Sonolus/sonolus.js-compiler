import { EngineTutorialData } from 'sonolus-core'
import { clean } from '../../../../../shared/utils/clean.js'

export const buildParticle = (
    particle: EngineTutorialData['particle'],
): EngineTutorialData['particle'] =>
    clean(particle, {
        effects: [
            {
                name: 'string',
                id: 'number',
            },
        ],
    })
