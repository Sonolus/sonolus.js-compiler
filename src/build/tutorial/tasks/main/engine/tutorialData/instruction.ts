import { Static, Type } from '@sinclair/typebox'
import { EngineTutorialData } from '@sonolus/core'
import { clean } from '../../../../../shared/utils/clean.js'

const schema = Type.Object({
    texts: Type.Array(
        Type.Object({
            name: Type.String(),
            id: Type.Number(),
        }),
    ),
    icons: Type.Array(
        Type.Object({
            name: Type.String(),
            id: Type.Number(),
        }),
    ),
})

type _Test<T extends Static<typeof schema> = EngineTutorialData['instruction']> = T

export const buildInstruction = (
    instruction: EngineTutorialData['instruction'],
): EngineTutorialData['instruction'] => clean(schema, instruction)
