import { Static, Type } from '@sinclair/typebox'
import { EngineDataBucket } from '@sonolus/core'
import { clean } from '../../../../utils/clean.js'

const schema = Type.Array(
    Type.Object({
        sprites: Type.Array(
            Type.Object({
                id: Type.Number(),
                fallbackId: Type.Optional(Type.Number()),
                x: Type.Number(),
                y: Type.Number(),
                w: Type.Number(),
                h: Type.Number(),
                rotation: Type.Number(),
            }),
        ),
        unit: Type.Optional(Type.String()),
    }),
)

type _Test<T extends Static<typeof schema> = EngineDataBucket[]> = T

export const buildBuckets = (buckets: EngineDataBucket[]): EngineDataBucket[] =>
    clean(schema, buckets)
