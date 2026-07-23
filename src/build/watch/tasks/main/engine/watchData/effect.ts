import { EngineWatchData } from '@sonolus/core'
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

type _Test<T extends Type.Static<typeof schema> = EngineWatchData['effect']> = T

export const buildEffect = (effect: EngineWatchData['effect']): EngineWatchData['effect'] =>
    clean(schema, effect)
