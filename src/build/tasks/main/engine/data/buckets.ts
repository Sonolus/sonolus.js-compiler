import { EnginePlayData } from 'sonolus-core'
import { clean } from '../../utils.js'

export const buildBuckets = (buckets: EnginePlayData['buckets']): EnginePlayData['buckets'] =>
    clean(buckets, [
        {
            sprites: [
                {
                    id: 'number',
                    'fallbackId?': 'number',
                    x: 'number',
                    y: 'number',
                    w: 'number',
                    h: 'number',
                    rotation: 'number',
                },
            ],
            'unit?': 'string',
        },
    ])
