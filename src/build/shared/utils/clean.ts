import Type from 'typebox'
import Value from 'typebox/value'

import { clone } from './clone.js'

export const clean = <T extends Type.TSchema>(schema: T, value: unknown): Type.Static<T> => {
    const result = clone(value)
    Value.Assert(schema, result)
    Value.Clean(schema, result)

    return result
}
