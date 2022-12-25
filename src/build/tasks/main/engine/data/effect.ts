import { EngineData } from 'sonolus-core'
import { clean } from '../../utils.js'

export const buildEffect = (effect: EngineData['effect']): EngineData['effect'] =>
    clean(effect, {
        clips: [
            {
                name: 'string',
                id: 'number',
            },
        ],
    })
