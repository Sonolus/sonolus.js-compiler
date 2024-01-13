import { LevelData } from 'sonolus-core'
import { clean } from '../../../../../shared/utils/clean.js'
import { Project } from '../../../../project.js'

export const buildLevelData = (data: Project['level']['data']): LevelData =>
    clean(data, {
        bgmOffset: 'number',
        entities: [
            {
                'name?': 'string',
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
