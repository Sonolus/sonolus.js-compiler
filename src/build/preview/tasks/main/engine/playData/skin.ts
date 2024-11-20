import { EnginePlayData } from '@sonolus/core'
import { clean } from '../../../../../shared/utils/clean.js'

export const buildSkin = (skin: EnginePlayData['skin']): EnginePlayData['skin'] =>
    clean(skin, {
        'renderMode?': 'string',
        sprites: [
            {
                name: 'string',
                id: 'number',
            },
        ],
    })
