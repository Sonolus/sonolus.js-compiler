import { Static, Type } from '@sinclair/typebox'
import { EngineWatchData } from '@sonolus/core'
import { clean } from '../../../../../shared/utils/clean.js'

const schema = Type.Object({
    renderMode: Type.Optional(
        Type.Union([
            Type.Literal('default'),
            Type.Literal('standard'),
            Type.Literal('lightweight'),
        ]),
    ),
    sprites: Type.Array(
        Type.Object({
            name: Type.String(),
            id: Type.Number(),
        }),
    ),
})

type _Test<T extends Static<typeof schema> = EngineWatchData['skin']> = T

export const buildSkin = (skin: EngineWatchData['skin']): EngineWatchData['skin'] =>
    clean(schema, skin)
