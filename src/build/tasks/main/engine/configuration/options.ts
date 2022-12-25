import { EngineConfigurationOption } from 'sonolus-core'
import { clean } from '../../utils.js'

export const buildOptions = (options: EngineConfigurationOption[]): EngineConfigurationOption[] =>
    clean(options, [
        {
            name: 'string',
            'standard?': 'boolean',
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
