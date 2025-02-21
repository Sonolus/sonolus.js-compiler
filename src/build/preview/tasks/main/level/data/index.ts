import { Static, Type } from '@sinclair/typebox'
import { LevelData } from '@sonolus/core'
import { clean } from '../../../../../shared/utils/clean.js'
import { Project } from '../../../../project.js'

const schema = Type.Object({
    bgmOffset: Type.Number(),
    entities: Type.Array(
        Type.Object({
            name: Type.Optional(Type.String()),
            archetype: Type.String(),
            data: Type.Array(
                Type.Union([
                    Type.Object({
                        name: Type.String(),
                        value: Type.Number(),
                    }),
                    Type.Object({
                        name: Type.String(),
                        ref: Type.String(),
                    }),
                ]),
            ),
        }),
    ),
})

type _Test<T extends Static<typeof schema> = LevelData> = T

export const buildLevelData = (data: Project['level']['data']): LevelData => clean(schema, data)
