import { LevelData } from 'sonolus-core'
import { Project } from '../../../../project.js'
import { clean } from '../../utils.js'

export const buildLevelData = (data: Project['level']['data']): LevelData =>
    clean(data, {
        bgmOffset: 'number',
        entities: [
            {
                'ref?': 'string',
                archetype: 'string',
                data: [
                    {
                        name: 'string',
                        'value?': 'number',
                        'ref?': 'string',
                    },
                ],
            },
        ],
    })
