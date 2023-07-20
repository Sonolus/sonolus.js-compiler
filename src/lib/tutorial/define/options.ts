import { EngineConfigurationOption } from 'sonolus-core'

export const defineOptions = (
    options: Record<string, EngineConfigurationOption>,
): EngineConfigurationOption[] => Object.values(options)
