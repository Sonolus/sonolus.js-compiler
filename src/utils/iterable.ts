export const isIterable = (value: unknown): value is Iterable<unknown> =>
    !!value && typeof value[Symbol.iterator as never] === 'function'
