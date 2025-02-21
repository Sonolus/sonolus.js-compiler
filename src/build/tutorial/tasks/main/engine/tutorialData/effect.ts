import { Static, Type } from '@sinclair/typebox'
import { EngineTutorialData } from '@sonolus/core'
import { clean } from '../../../../../shared/utils/clean.js'

const schema = Type.Object({
    clips: Type.Array(
        Type.Object({
            name: Type.String(),
            id: Type.Number(),
        }),
    ),
})

type _Test<T extends Static<typeof schema> = EngineTutorialData['effect']> = T

export const buildEffect = (effect: EngineTutorialData['effect']): EngineTutorialData['effect'] =>
    clean(schema, effect)
