import { Static, Type } from '@sinclair/typebox'
import { EnginePlayData } from '@sonolus/core'
import { clean } from '../../../../../shared/utils/clean.js'

const schema = Type.Object({
    clips: Type.Array(
        Type.Object({
            name: Type.String(),
            id: Type.Number(),
        }),
    ),
})

type _Test<T extends Static<typeof schema> = EnginePlayData['effect']> = T

export const buildEffect = (effect: EnginePlayData['effect']): EnginePlayData['effect'] =>
    clean(schema, effect)
