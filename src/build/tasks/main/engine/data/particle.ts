import { EnginePlayData } from 'sonolus-core'
import { clean } from '../../utils.js'

export const buildParticle = (particle: EnginePlayData['particle']): EnginePlayData['particle'] =>
    clean(particle, {
        effects: [
            {
                name: 'string',
                id: 'number',
            },
        ],
    })
