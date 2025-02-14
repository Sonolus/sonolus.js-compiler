import { Static, Type } from '@sinclair/typebox'
import { EngineTutorialData } from '@sonolus/core'
import { clean } from '../../../../../shared/utils/clean.js'

const schema = Type.Object({
    effects: Type.Array(
        Type.Object({
            name: Type.String(),
            id: Type.Number(),
        }),
    ),
})

type _Test<T extends Static<typeof schema> = EngineTutorialData['particle']> = T

export const buildParticle = (
    particle: EngineTutorialData['particle'],
): EngineTutorialData['particle'] => clean(schema, particle)
