import { EngineTutorialData } from 'sonolus-core'
import { clean } from '../../../../../shared/utils/clean.js'

export const buildInstruction = (
    instruction: EngineTutorialData['instruction'],
): EngineTutorialData['instruction'] =>
    clean(instruction, {
        texts: [
            {
                name: 'string',
                id: 'number',
            },
        ],
    })
