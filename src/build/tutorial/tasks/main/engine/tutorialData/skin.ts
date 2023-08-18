import { EngineTutorialData } from 'sonolus-core'
import { clean } from '../../../../../shared/utils/clean.js'

export const buildSkin = (skin: EngineTutorialData['skin']): EngineTutorialData['skin'] =>
    clean(skin, {
        sprites: [
            {
                name: 'string',
                id: 'number',
            },
        ],
    })
