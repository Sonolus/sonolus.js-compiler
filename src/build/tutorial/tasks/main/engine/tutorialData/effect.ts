import { EngineTutorialData } from '@sonolus/core'
import { clean } from '../../../../../shared/utils/clean.js'

export const buildEffect = (effect: EngineTutorialData['effect']): EngineTutorialData['effect'] =>
    clean(effect, {
        clips: [
            {
                name: 'string',
                id: 'number',
            },
        ],
    })
