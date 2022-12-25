import { EngineConfigurationOption } from 'sonolus-core'
import { preprocessWritablePointer } from '../utils/pointer.js'

type OptionsDefinition = Record<string, EngineConfigurationOption>

type Options<T extends OptionsDefinition> = EngineConfigurationOption[] & {
    readonly [K in keyof T]: T[K]['type'] extends 'slider'
        ? number
        : T[K]['type'] extends 'toggle'
        ? boolean
        : T[K]['type'] extends 'select'
        ? number
        : never
}

export const defineOptions = <T extends OptionsDefinition>(options: T): Options<T> =>
    Object.assign(
        Object.values(options),
        Object.fromEntries(
            Object.keys(options).map((key, index) => [
                key,
                preprocessWritablePointer(2002, index, 0, 0),
            ]),
        ),
    ) as never
