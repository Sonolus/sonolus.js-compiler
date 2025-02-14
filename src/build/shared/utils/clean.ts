import { Static, TSchema } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import { clone } from './clone.js'

export const clean = <T extends TSchema>(schema: T, value: unknown): Static<T> => {
    const result = Value.Clean(schema, clone(value))
    Value.Assert(schema, result)

    return result
}
