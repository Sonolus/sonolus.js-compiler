import { EnginePlayData } from '@sonolus/core'
import { clean } from '../../../../../shared/utils/clean.js'

export const buildParticle = (particle: EnginePlayData['particle']): EnginePlayData['particle'] =>
    clean(particle, {
        effects: [
            {
                name: 'string',
                id: 'number',
            },
        ],
    })
