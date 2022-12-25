import { EngineData } from 'sonolus-core'
import { clean } from '../../utils.js'

export const buildParticle = (particle: EngineData['particle']): EngineData['particle'] =>
    clean(particle, {
        effects: [
            {
                name: 'string',
                id: 'number',
            },
        ],
    })
