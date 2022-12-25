import { EngineData } from 'sonolus-core'
import { clean } from '../../utils.js'

export const buildBuckets = (buckets: EngineData['buckets']): EngineData['buckets'] =>
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
