import { EngineConfigurationOption } from 'sonolus-core'

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

export const createDefineOption =
    (pointer: <T>(x: number, y: number, s: number) => T) =>
    <T extends OptionsDefinition>(options: T): Options<T> =>
        Object.assign(
            Object.values(options),
            Object.fromEntries(
                Object.keys(options).map((key, index) => [key, pointer(index, 0, 0)]),
            ),
        ) as never
