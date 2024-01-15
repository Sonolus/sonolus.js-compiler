import { EngineDataBucket } from 'sonolus-core'
import { clean } from '../../../../utils/clean.js'

export const buildBuckets = (buckets: EngineDataBucket[]): EngineDataBucket[] =>
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
