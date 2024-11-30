import { EngineTutorialData } from '@sonolus/core'
import { clean } from '../../../../../shared/utils/clean.js'

export const buildSkin = (skin: EngineTutorialData['skin']): EngineTutorialData['skin'] =>
    clean(skin, {
        'renderMode?': 'string',
        sprites: [
            {
                name: 'string',
                id: 'number',
            },
        ],
    })
