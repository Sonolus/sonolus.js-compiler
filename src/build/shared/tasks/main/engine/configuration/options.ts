import { EngineConfigurationOption } from 'sonolus-core'
import { clean } from '../../../../utils/clean.js'

export const buildOptions = (options: EngineConfigurationOption[]): EngineConfigurationOption[] =>
    clean(options, [
        {
            name: 'string',
            'standard?': 'boolean',
            'advanced?': 'boolean',
            'scope?': 'string',
            type: 'string',
            def: 'number',
            'min?': 'number',
            'max?': 'number',
            'step?': 'number',
            'unit?': 'string',
            'values?': ['string'],
        },
    ])
