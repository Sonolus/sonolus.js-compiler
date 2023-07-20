import { EnginePlayData } from 'sonolus-core'
import { clean } from '../../utils.js'

export const buildEffect = (effect: EnginePlayData['effect']): EnginePlayData['effect'] =>
    clean(effect, {
        clips: [
            {
                name: 'string',
                id: 'number',
            },
        ],
    })
