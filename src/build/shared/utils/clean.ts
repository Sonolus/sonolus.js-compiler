type UnionKeys<T> = T extends T ? keyof T : never

type Schema_<T, Recur extends boolean = true> = [T] extends [undefined]
    ? undefined
    : [T] extends [string]
    ? 'string'
    : [T] extends [number]
    ? 'number'
    : [T] extends [boolean]
    ? 'boolean'
    : [T] extends [(infer T)[]]
    ? [Schema<T>]
    : [T] extends [object]
    ? {
          [K in UnionKeys<T> & string as [K, T[K]] extends [keyof T, Required<T>[K]]
              ? K
              : `${K}?`]-?: Schema<T[K]>
      }
    : Recur extends false
    ? T
    : T extends T
    ? Schema_<T, false>
    : never

export type Schema<T> = Schema_<T>

export const clean = <T>(value: T, schema: Schema<T>): T => {
    if (schema === 'string' || schema === 'number' || schema === 'boolean') {
        if (typeof value !== schema)
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            throw new Error(`Type mismatch: expected ${schema}, got ${typeof value}`)

        return value
    }

    if (Array.isArray(schema)) return (value as unknown[]).map((v) => clean(v, schema[0])) as never

    return Object.fromEntries(
        Object.entries(schema as never).flatMap(([k, v]) => {
            if (!k.endsWith('?')) return [[k, clean((value as never)[k], v as never)]]

            k = k.slice(0, -1)
            return k in (value as never) ? [[k, clean((value as never)[k], v as never)]] : []
        }),
    ) as never
}
