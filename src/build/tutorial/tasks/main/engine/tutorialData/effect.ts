import { EngineTutorialData } from '@sonolus/core'
import Type from 'typebox'

import { clean } from '../../../../../shared/utils/clean.js'

const schema = Type.Object({
    clips: Type.Array(
        Type.Object({
            name: Type.String(),
            id: Type.Number(),
        }),
    ),
})

type _Test<T extends Type.Static<typeof schema> = EngineTutorialData['effect']> = T

export const buildEffect = (effect: EngineTutorialData['effect']): EngineTutorialData['effect'] =>
    clean(schema, effect)
