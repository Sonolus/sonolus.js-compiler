import { EngineConfiguration } from 'sonolus-core'
import { Project } from '../../../../project.js'
import { buildOptions } from './options.js'
import { buildUI } from './ui.js'

export const buildEngineConfiguration = (
    configuration: Project['engine']['configuration'],
): EngineConfiguration => ({
    options: buildOptions(configuration.options),
    ui: buildUI(configuration.ui),
})
