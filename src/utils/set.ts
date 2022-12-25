export const intersection = <K>(
    a: ReadonlySet<K> = new Set(),
    b: ReadonlySet<K> = new Set(),
): Set<K> => new Set([...a].filter((value) => b.has(value)))

export const union = <K>(a: ReadonlySet<K> = new Set(), b: ReadonlySet<K> = new Set()): Set<K> =>
    new Set([...a, ...b])

export const compare = <K>(a: ReadonlySet<K>, b: ReadonlySet<K>): boolean => {
    if (a === b) return true
    if (a.size !== b.size) return false

    return [...a].every((value) => b.has(value))
}
