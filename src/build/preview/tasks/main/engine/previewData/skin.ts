import { Static, Type } from '@sinclair/typebox'
import { EnginePreviewData } from '@sonolus/core'
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

type _Test<T extends Static<typeof schema> = EnginePreviewData['skin']> = T

export const buildSkin = (skin: EnginePreviewData['skin']): EnginePreviewData['skin'] =>
    clean(schema, skin)
