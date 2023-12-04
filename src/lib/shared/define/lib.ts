import { Intrinsic } from '../../../intrinsic/index.js'

type LibDefinition<T> = T extends Function
    ? Intrinsic<'Call'> | T
    : T extends boolean | number | string
      ? Intrinsic<'Get'> | T
      : T extends Iterable<unknown>
        ? Intrinsic<'Iterate'> & LibObjectDefinition<Omit<T, typeof Symbol.iterator>>
        : LibObjectDefinition<T>

type LibObjectDefinition<T> = { [K in keyof T]: LibDefinition<T[K]> }

export const defineLib = <T>(lib: LibDefinition<T>): T => lib as never
