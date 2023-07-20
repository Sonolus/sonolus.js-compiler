import { EnginePlayData } from 'sonolus-core'
import { clean } from '../../utils.js'

export const buildSkin = (skin: EnginePlayData['skin']): EnginePlayData['skin'] =>
    clean(skin, {
        sprites: [
            {
                name: 'string',
                id: 'number',
            },
        ],
    })
