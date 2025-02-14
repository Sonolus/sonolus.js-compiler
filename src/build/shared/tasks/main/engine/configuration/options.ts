import { Static, Type } from '@sinclair/typebox'
import { EngineConfigurationOption } from '@sonolus/core'
import { clean } from '../../../../utils/clean.js'

const schema = Type.Array(
    Type.Union([
        Type.Object({
            name: Type.String(),
            description: Type.Optional(Type.String()),
            standard: Type.Optional(Type.Boolean()),
            advanced: Type.Optional(Type.Boolean()),
            scope: Type.Optional(Type.String()),
            type: Type.Literal('slider'),
            def: Type.Number(),
            min: Type.Number(),
            max: Type.Number(),
            step: Type.Number(),
            unit: Type.Optional(Type.String()),
        }),
        Type.Object({
            name: Type.String(),
            description: Type.Optional(Type.String()),
            standard: Type.Optional(Type.Boolean()),
            advanced: Type.Optional(Type.Boolean()),
            scope: Type.Optional(Type.String()),
            type: Type.Literal('toggle'),
            def: Type.Union([Type.Literal(0), Type.Literal(1)]),
        }),
        Type.Object({
            name: Type.String(),
            description: Type.Optional(Type.String()),
            standard: Type.Optional(Type.Boolean()),
            advanced: Type.Optional(Type.Boolean()),
            scope: Type.Optional(Type.String()),
            type: Type.Literal('select'),
            def: Type.Number(),
            values: Type.Array(Type.String()),
        }),
    ]),
)

type _Test<T extends Static<typeof schema> = EngineConfigurationOption[]> = T

export const buildOptions = (options: EngineConfigurationOption[]): EngineConfigurationOption[] =>
    clean(schema, options)
