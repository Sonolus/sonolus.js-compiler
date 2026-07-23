import { EngineWatchData } from '@sonolus/core'
import Type from 'typebox'

import { clean } from '../../../../../shared/utils/clean.js'

const schema = Type.Object({
    effects: Type.Array(
        Type.Object({
            name: Type.String(),
            id: Type.Number(),
        }),
    ),
})

type _Test<T extends Type.Static<typeof schema> = EngineWatchData['particle']> = T

export const buildParticle = (particle: EngineWatchData['particle']): EngineWatchData['particle'] =>
    clean(schema, particle)
