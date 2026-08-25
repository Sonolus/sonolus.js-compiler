import { EngineConfiguration } from '@sonolus/core'

import { buildOptions } from './options.js'
import { buildUI } from './ui.js'

export const buildEngineConfiguration = (
    configuration: EngineConfiguration,
): EngineConfiguration => ({
    ...(configuration.optionCategories && {
        optionCategories: configuration.optionCategories,
    }),
    options: buildOptions(configuration.options),
    ui: buildUI(configuration.ui),
    ...(configuration.replayFallbackOptionNames && {
        replayFallbackOptionNames: configuration.replayFallbackOptionNames,
    }),
})
