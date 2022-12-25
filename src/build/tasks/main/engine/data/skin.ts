import { EngineData } from 'sonolus-core'
import { clean } from '../../utils.js'

export const buildSkin = (skin: EngineData['skin']): EngineData['skin'] =>
    clean(skin, {
        sprites: [
            {
                name: 'string',
                id: 'number',
            },
        ],
    })
